import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

const PERMISSIONS = [
  { name: "users:read", description: "View users" },
  { name: "users:create", description: "Create users" },
  { name: "users:update", description: "Update users" },
  { name: "users:delete", description: "Delete users" },
  { name: "roles:read", description: "View roles" },
  { name: "roles:create", description: "Create roles" },
  { name: "roles:update", description: "Update roles" },
  { name: "roles:delete", description: "Delete roles" },
  { name: "permissions:read", description: "View permissions" },
  { name: "admin:access", description: "Access admin panel" },
] as const;

async function main() {
  // Create permissions
  const permissions = await Promise.all(
    PERMISSIONS.map((p) =>
      prisma.permission.upsert({
        where: { name: p.name },
        update: {},
        create: p,
      }),
    ),
  );

  const permissionMap = Object.fromEntries(permissions.map((p) => [p.name, p]));

  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: { name: "admin", description: "Full access administrator" },
  });

  const moderatorRole = await prisma.role.upsert({
    where: { name: "moderator" },
    update: {},
    create: { name: "moderator", description: "Read access with admin panel" },
  });

  const customerRole = await prisma.role.upsert({
    where: { name: "customer" },
    update: {},
    create: { name: "customer", description: "Regular customer" },
  });

  // Assign permissions to roles
  // Admin gets all permissions
  for (const perm of permissions) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRole.id, permissionId: perm.id } },
      update: {},
      create: { roleId: adminRole.id, permissionId: perm.id },
    });
  }

  // Moderator gets read permissions + admin:access
  const moderatorPerms = ["users:read", "roles:read", "permissions:read", "admin:access"];
  for (const permName of moderatorPerms) {
    const perm = permissionMap[permName];
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: moderatorRole.id, permissionId: perm.id } },
      update: {},
      create: { roleId: moderatorRole.id, permissionId: perm.id },
    });
  }

  // Customer gets no permissions

  // Create users
  const users = [
    { email: "admin@sgsgym.dev", name: "Admin", password: "admin123", roleId: adminRole.id },
    { email: "moderator@sgsgym.dev", name: "Moderator", password: "moderator123", roleId: moderatorRole.id },
    { email: "customer@sgsgym.dev", name: "Customer", password: "customer123", roleId: customerRole.id },
  ];

  for (const u of users) {
    const passwordHash = await argon2.hash(u.password);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        name: u.name,
        passwordHash,
        roleId: u.roleId,
      },
    });
    console.log(`Seeded user: ${u.email} (${u.name})`);
  }

  console.log("Seed completed successfully.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
