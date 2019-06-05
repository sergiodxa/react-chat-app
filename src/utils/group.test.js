import group from "./group";

import format from "date-fns/format";

test("group should return the list of messages grouped by date", () => {
  const messages = [
    {
      content: "Test one",
      username: "test-user",
      date: "2019-06-02T00:45:43.963Z",
      channel: "general"
    },
    {
      content: "Test two",
      username: "test-user",
      date: "2019-06-01T00:45:43.963Z",
      channel: "general"
    },
    {
      content: "Test three",
      username: "test-user",
      date: "2019-05-03T00:45:43.963Z",
      channel: "general"
    }
  ];

  const groupedMessages = group(messages);

  const groupOne = format("2019-06-02T00:45:43.963Z", "dddd, MMMM Do");
  const groupTwo = format("2019-06-01T00:45:43.963Z", "dddd, MMMM Do")
  const groupThree = format("2019-05-03T00:45:43.963Z", "dddd, MMMM Do")

  expect(groupedMessages).toHaveProperty(
    groupOne
  );
  expect(groupedMessages).toHaveProperty(
    groupTwo
  );
  expect(groupedMessages).toHaveProperty(
    groupThree
  );

  expect(groupedMessages[groupOne]).toEqual(expect.any(Array));
  expect(groupedMessages[groupTwo]).toEqual(expect.any(Array));
  expect(groupedMessages[groupThree]).toEqual(expect.any(Array));

  expect(groupedMessages[groupOne][0]).toHaveProperty("content");
  expect(groupedMessages[groupOne][0].content).toBe("Test one");

  expect(groupedMessages[groupTwo][0]).toHaveProperty("content");
  expect(groupedMessages[groupTwo][0].content).toBe("Test two");
  
  expect(groupedMessages[groupThree][0]).toHaveProperty("content");
  expect(groupedMessages[groupThree][0].content).toBe("Test three");
});
