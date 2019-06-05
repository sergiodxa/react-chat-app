import { cleanup } from "@testing-library/react";
import * as emotion from "@emotion/core";
import { createSerializer } from "jest-emotion";

afterEach(cleanup);

expect.addSnapshotSerializer(createSerializer(emotion));

global.Notification = class Notification {
  constructor(title, options) {
    this.title = title;
    this.options = options;
  }
  static permission = "default";
  static requestPermission = jest.fn(() => {
    global.Notification.permission = "granted";
    return Promise.resolve("granted");
  });
};
