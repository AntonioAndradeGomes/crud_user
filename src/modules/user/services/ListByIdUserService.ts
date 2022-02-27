import prismaClient from "../../../prisma/prisma";

class ListUserByIdService {
  async execute(id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id },
      select: {
        avatar: true,
        createdAt: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    return user;
  }
}

export { ListUserByIdService };
