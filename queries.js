import mongoose from "mongoose";
import User from "./models/User.js";
import Question from "./models/Question.js";
import Answer from "./models/Answer.js";
import dotenv from "dotenv";

async function query1() {
  // Create a user with name Robin, email robin@example.com, password hashed_password_7, and createdAt set to 2025-06-25T10:15:00Z
  try {
    const user = new User({
      name: "Robin",
      email: "robin@example.com",
      password: "hashed_password_7",
      createdAt: new Date("2025-06-25T10:15:00Z"),
    });
    await user.save();
    console.log("User created:", user);
  } catch (error) {
    console.error("Error in query1:", error.message);
  }
}

async function query2() {
  // Fetch the user with email alice@example.com
  try {
    const user = await User.findOne({ email: "alice@example.com" });
    console.log("User fetched:", user);
  } catch (error) {
    console.error("Error in query2:", error.message);
  }
}

async function query3() {
  // Fetch question with the title 'How can I improve the performance of a react app?'
  try {
    const question = await Question.findOne({ title: "How can I improve the performance of a react app?" });
    console.log("Question fetched:", question);
  } catch (error) {
    console.error("Error in query3:", error.message);
  }
}

async function query4() {
  // Find all questions tagged with 'javascript'
  try {
    const questions = await Question.find({ tags: "javascript" });
    console.log("Questions tagged with 'javascript':", questions);
  } catch (error) {
    console.error("Error in query4:", error.message);
  }
}

async function query5() {
  // Retrieve all questions posted after April 1, 2023
  try {
    const questions = await Question.find({ createdAt: { $gt: new Date("2023-04-01T00:00:00Z") } });
    console.log("Questions posted after April 1, 2023:", questions);
  } catch (error) {
    console.error("Error in query5:", error.message);
  }
}

async function query6() {
  // Find all questions tagged with javascript or react
  try {
    const questions = await Question.find({ tags: { $in: ["javascript", "react"] } });
    console.log("Questions tagged with 'javascript' or 'react':", questions);
  } catch (error) {
    console.error("Error in query6:", error.message);
  }
}

async function query7() {
  // Find all the distinct tags used in questions
  try {
    const tags = await Question.distinct("tags");
    console.log("Distinct tags:", tags);
  } catch (error) {
    console.error("Error in query7:", error.message);
  }
}

async function query8() {
  // Retrieve all questions with at least 50 views
  try {
    const questions = await Question.find({ views: { $gte: 50 } });
    console.log("Questions with at least 50 views:", questions);
  } catch (error) {
    console.error("Error in query8:", error.message);
  }
}

async function query9() {
  // List all answers with a vote count of 0
  try {
    const answers = await Answer.find({ voteCount: 0 });
    console.log("Answers with voteCount 0:", answers);
  } catch (error) {
    console.error("Error in query9:", error.message);
  }
}

async function query10() {
  // Retrieve all answers with a voteCount greater than 0
  try {
    const answers = await Answer.find({ voteCount: { $gt: 0 } });
    console.log("Answers with voteCount > 0:", answers);
  } catch (error) {
    console.error("Error in query10:", error.message);
  }
}

async function query11() {
  // Retrieve all users whose account was created between January 1, 2023 (inclusive) and May 1, 2023 (exclusive)
  try {
    const users = await User.find({
      createdAt: {
        $gte: new Date("2023-01-01T00:00:00Z"),
        $lt: new Date("2023-05-01T00:00:00Z")
      }
    });
    console.log("Users created between Jan 1 and May 1, 2023:", users);
  } catch (error) {
    console.error("Error in query11:", error.message);
  }
}

async function query12() {
  // Fetch the answer text and author id of all answers for the question 'How do I set up routing with react router v6?'
  try {
    const question = await Question.findOne({ title: "How do I set up routing with react router v6?" });
    if (!question) {
      console.log("Question not found.");
      return;
    }
    const answers = await Answer.find({ questionId: question._id }, { answerText: 1, author: 1 });
    console.log("Answers for the question:", answers);
  } catch (error) {
    console.error("Error in query12:", error.message);
  }
}

async function query13() {
  // Find all users who have not posted any answers
  try {
    const usersWithAnswers = await Answer.distinct("author");
    const users = await User.find({ _id: { $nin: usersWithAnswers } });
    console.log("Users who have not posted any answers:", users);
  } catch (error) {
    console.error("Error in query13:", error.message);
  }
}

async function query14() {
  // Find the top two questions with the highest voteCount
  try {
    const questions = await Question.find().sort({ voteCount: -1 }).limit(2);
    console.log("Top two questions by voteCount:", questions);
  } catch (error) {
    console.error("Error in query14:", error.message);
  }
}

async function query15() {
  // Retrieve the ids of all users who have posted answers, along with the number of answers they have posted
  try {
    const result = await Answer.aggregate([
      { $group: { _id: "$author", answerCount: { $sum: 1 } } }
    ]);
    console.log("Users who posted answers and their counts:", result);
  } catch (error) {
    console.error("Error in query15:", error.message);
  }
}

async function query16() {
  // Identify the top two users who posted the most answers
  try {
    const result = await Answer.aggregate([
      { $group: { _id: "$author", answerCount: { $sum: 1 } } },
      { $sort: { answerCount: -1 } },
      { $limit: 2 }
    ]);
    console.log("Top two users by answers posted:", result);
  } catch (error) {
    console.error("Error in query16:", error.message);
  }
}

async function query17() {
  // Update the tags of the question 'Why is my async function returning a promise instead of the actual value?' to ['javascript', 'async']
  try {
    const question = await Question.findOneAndUpdate(
      { title: "Why is my async function returning a promise instead of the actual value?" },
      { $set: { tags: ["javascript", "async"] } },
      { new: true }
    );
    console.log("Updated question:", question);
  } catch (error) {
    console.error("Error in query17:", error.message);
  }
}

async function query18() {
  // Update the name of the user with email 'alice@example.com' to 'Alice Smith'
  try {
    const user = await User.findOneAndUpdate(
      { email: "alice@example.com" },
      { $set: { name: "Alice Smith" } },
      { new: true }
    );
    console.log("Updated user:", user);
  } catch (error) {
    console.error("Error in query18:", error.message);
  }
}

async function query19() {
  // Delete the user with email 'jhonny@example.com'
  try {
    const result = await User.deleteOne({ email: "jhonny@example.com" });
    console.log("Delete result for user 'jhonny@example.com':", result);
  } catch (error) {
    console.error("Error in query19:", error.message);
  }
}

async function query20() {
  // Delete all answers of the user with email 'alice@example.com'
  try {
    const user = await User.findOne({ email: "alice@example.com" });
    if (!user) {
      console.log("User not found.");
      return;
    }
    const result = await Answer.deleteMany({ author: user._id });
    console.log("Deleted answers for user 'alice@example.com':", result);
  } catch (error) {
    console.error("Error in query20:", error.message);
  }
}

const printHeader = (num, title) => {
  console.log("\n" + "─".repeat(60));
  console.log(`Q${num}. ${title}`);
  console.log("─".repeat(60));
};

async function runQueries() {
  printHeader(
    1,
    "Create a user with name Robin, email robin@example.com, password hashed_password_7, and createdAt set to 2025-06-25T10:15:00Z",
  );
  await query1();
  printHeader(2, "Fetch the user with email alice@example.com");
  await query2();
  printHeader(
    3,
    'Fetch question with the title "How can I improve the performance of a react app?"',
  );
  await query3();
  printHeader(4, 'Find all questions tagged with "javascript"');
  await query4();
  printHeader(5, "Retrieve all questions posted after April 1, 2023");
  await query5();
  printHeader(6, "Find all questions tagged with javascript or react");
  await query6();
  printHeader(7, "Find all the distinct tags used in questions");
  await query7();
  printHeader(8, "Retrieve all questions with at least 50 views");
  await query8();
  printHeader(9, "List all answers with a vote count of 0");
  await query9();
  printHeader(10, "Retrieve all answers with a voteCount greater than 0");
  await query10();
  printHeader(
    11,
    "Retrieve all users whose account was created between January 1, 2023 (inclusive) and May 1, 2023 (exclusive)",
  );
  await query11();
  printHeader(
    12,
    'Fetch the answer text and author id of all answers for the question "How do I set up routing with react router v6?"',
  );
  await query12();
  printHeader(13, "Find all users who have not posted any answers");
  await query13();
  printHeader(14, "Find the top two most upvoted questions");
  await query14();
  printHeader(
    15,
    "Retrieve the ids of all users who have posted answers, along with the number of answers they have posted",
  );
  await query15();
  printHeader(16, "Identify the top two users who posted the most answers");
  await query16();
  printHeader(
    17,
    "Update the tags of the question 'Why is my async function returning a promise instead of the actual value?' to ['javascript', 'async']",
  );
  await query17();
  printHeader(
    18,
    "Update the name of the user with email 'alice@example.com' to 'Alice Smith'",
  );
  await query18();
  printHeader(19, "Delete the user with email 'jhonny@example.com'");
  await query19();
  printHeader(
    20,
    "Delete all answers of the user with email 'alice@example.com'",
  );
  await query20();
}

async function main() {
  try {
    dotenv.config();
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully to database");
    await runQueries();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

main();
