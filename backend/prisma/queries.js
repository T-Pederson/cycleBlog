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

async function createAuthor(username, password, isAuthor = true) {
  return await prisma.user.create({
    data: {
      username,
      password,
      isAuthor,
    },
  });
}

async function convertUserToAuthor(id) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      isAuthor: true,
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
async function createPost(authorId, title, content, published, publishedAt) {
  return await prisma.post.create({
    data: {
      authorId,
      title,
      content,
      published,
      publishedAt,
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
      published: true,
      publishedAt: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      comments: {
        select: {
          id: true,
          author: {
            select: {
              id: true,
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

async function getAuthorPosts(authorId) {
  return await prisma.post.findMany({
    where: {
      authorId,
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
      id: "desc",
    },
  });
}

async function updatePost(id, title, content, published) {
  const data = {
    title,
    content,
    published,
    publishedAt: null,
  };

  if (published) {
    data.publishedAt = new Date();
  }

  return await prisma.post.update({
    where: {
      id,
    },
    data,
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

async function getComment(id) {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      post: {
        select: {
          author: {
            select: {
              id: true,
            },
          },
        },
      },
      authorId: true,
      content: true,
      commentedAt: true,
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
  createAuthor,
  convertUserToAuthor,
  findUserByUsername,
  findUserById,
  createPost,
  getPostById,
  getAllPosts,
  getAuthorPosts,
  updatePost,
  deletePost,
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
