import prismaClient from "../../../prisma/prisma";

class ListAllUsersService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: {
        avatar: true,
        createdAt: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
        birthDate: true,
      },
    });
    return users;
  }
}

export { ListAllUsersService };
