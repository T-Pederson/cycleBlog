const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// User
async function createUser(username, password, isAuthor = false) {
  return await prisma.user.create({
    data: {
      username,
      password,
      isAuthor,
    },
  });
}

async function findUserByUsername(username) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
}

async function findUserById(id) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

// Post
async function createPost(authorId, title, content, published) {
  return await prisma.post.create({
    data: {
      authorId,
      title,
      content,
      published,
    },
  });
}

async function getPostById(id) {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      author: {
        select: {
          username: true,
        },
      },
      comments: {
        select: {
          id: true,
          author: {
            select: {
              username: true,
            },
          },
          content: true,
          commentedAt: true,
        },
        orderBy: {
          commentedAt: "desc",
        },
      },
    },
  });
}

async function getAllPosts() {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}

async function updatePostContent(id, title, content, published) {
  return await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      published,
    },
  });
}

async function deletePost(id) {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
}

// Comment
async function createComment(postId, authorId, content) {
  return await prisma.comment.create({
    data: {
      postId,
      authorId,
      content,
    },
  });
}

async function updateComment(id, content) {
  return await prisma.comment.update({
    where: {
      id,
    },
    data: {
      content,
      commentedAt: new Date(),
    },
  });
}

async function deleteComment(id) {
  return await prisma.comment.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  createPost,
  getPostById,
  getAllPosts,
  updatePostContent,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
};
