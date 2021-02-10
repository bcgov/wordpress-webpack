import { sample_test } from "../index";
describe("Example Site", () => {
  test("Testing sample test", () => {
    const results = sample_test("something");
    expect(results).not.toBeUndefined();
    expect(results).toBe("something");
  });
});
