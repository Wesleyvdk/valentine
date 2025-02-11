import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Test the connection
    await prisma.$connect()
    console.log("Successfully connected to the database")

    // Create a test reply
    const testReply = await prisma.reply.create({
      data: {
        answer: "test",
      },
    })
    console.log("Successfully created test reply:", testReply)

    // Clean up test data
    await prisma.reply.delete({
      where: {
        id: testReply.id,
      },
    })
    console.log("Successfully cleaned up test data")
  } catch (error) {
    console.error("Database test failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

