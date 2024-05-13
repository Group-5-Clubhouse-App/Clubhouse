const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10

const createUsersAndPosts = async () => {
  const hashedPass1 = await bcrypt.hash(`nunya1`, saltRounds);
  const hashedPass2 = await bcrypt.hash(`nunya2`, saltRounds);
  const hashedPass3 = await bcrypt.hash(`nunya3`, saltRounds);
  const hashedPass4 = await bcrypt.hash(`nunya4`, saltRounds);

  console.log(`CLEARING TABLES`);

  const usersToDelete = await prisma.users.findMany({
    where: {
      OR: [
        { username: 'uno' },
        { username: 'dos' },
        { username: 'tres' }
      ]
    }
  });
  
  if (usersToDelete.length > 0) {
    const clearUsers = await prisma.users.deleteMany({
      where: {
        OR: [
          { username: 'uno' },
          { username: 'dos' },
          { username: 'tres' }
        ]
      }
    });
    console.log(`${clearUsers.count} users deleted.`);
  } else {
    console.log('No users found matching the criteria.');
  }

  console.log(`TABLES CLEARED`);

  const userArray = []
  const postsArray = []

  console.log(`MAKING TABLES`)

  const user1 = await prisma.users.create({
    data:{
      username: `uno`,
      password: hashedPass1,
    }
  });
  userArray.push(user1);
  const user2 = await prisma.users.create({
    data:{
      username: `dos`,
      password: hashedPass2,
    }
  });
  userArray.push(user2);
  const user3 = await prisma.users.create({
    data:{
      username: `tres`,
      password: hashedPass3,
    }
  });
  userArray.push(user3);

 console.log(`USERS MADE`);

  const post1 = await prisma.posts.create({
    data: {
      userid: userArray[0].id,
      description: `Clubhouse post #1`
    }
  });
  postsArray.push(post1);
  const post2 = await prisma.posts.create({
    data: {
      userid: userArray[1].id,
      description: `Clubhouse post #2`
    }
  });
  postsArray.push(post2);
  const post3 = await prisma.posts.create({
    data: {
      userid: userArray[2].id,
      description: `Clubhouse post #3`
    }
  });
  postsArray.push(post3);
 
  console.log(`TABLES MADE`)
}

createUsersAndPosts();