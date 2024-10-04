import React from "react";
import {faker} from '@faker-js/faker'

const commentsData = [
    {
      avatar: faker.image.avatar(),
      author: "Dadang",
      date: "Today at 5:00 PM",
      comment: "This is a great post!",
    },
    {
      avatar: faker.image.avatar(),
      author: "Jane Smith",
      date: "Today at 4:30 PM",
      comment: "I found this very helpful, thank you!",
    },
    {
      avatar: faker.image.avatar(),
      author: "Alice Johnson",
      date: "Today at 3:15 PM",
      comment: "Can you share more details on this topic?",
    },
    {
      avatar: faker.image.avatar(),
      author: "Bob Brown",
      date: "Today at 2:00 PM",
      comment: "I completely agree with you!",
    },
    {
      avatar: faker.image.avatar(),
      author: "Charlie Davis",
      date: "Today at 1:45 PM",
      comment: "Awesome article, I learned a lot.",
    },
    {
      avatar: faker.image.avatar(),
      author: "Diana Wilson",
      date: "Today at 12:30 PM",
      comment: "Thanks for sharing your insights!",
    },
    {
      avatar: faker.image.avatar(),
      author: "Ethan Garcia",
      date: "Today at 11:15 AM",
      comment: "This really changed my perspective.",
    },
    {
      avatar: faker.image.avatar(),
      author: "Fiona Martinez",
      date: "Today at 10:00 AM",
      comment: "Interesting point of view!",
    },
    {
      avatar: faker.image.avatar(),
      author: "George Taylor",
      date: "Today at 9:00 AM",
      comment: "I disagree, I think it's not as simple as that.",
    },
    {
      avatar: faker.image.avatar(),
      author: "Hannah Anderson",
      date: "Today at 8:30 AM",
      comment: "Great read! Looking forward to more posts like this.",
    },
  ];
  
  export default commentsData;
  