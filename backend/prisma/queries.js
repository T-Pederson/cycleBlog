const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// User
async function createUser(username, password, isAuthor) {
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
  });
}

async function getAllPublishedPosts(count = 0) {
  if ((count = 0)) {
    return await prisma.post.findMany({
      orderBy: {
        publishedAt: "desc",
      },
    });
  } else {
    return await prisma.post.findMany({
      take: count,
      orderBy: {
        publishedAt: "desc",
      },
    });
  }
}

async function getAllPostsForAuthor(authorId) {
  return await prisma.post.findMany({
    where: {
      OR: [
        {
          authorId,
        },
        {
          published: true,
        },
      ],
    },
  });
}

async function updatePostContent(id, title, content) {
  return await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
}

async function updatePostPublishedStatus(id, published) {
  return await prisma.post.update({
    where: {
      id,
    },
    data: {
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

async function getPostComments(postId) {
  return await prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      commentedAt: "desc",
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
  getAllPublishedPosts,
  getAllPostsForAuthor,
  updatePostContent,
  updatePostPublishedStatus,
  deletePost,
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
};
