import fetchx from "../main";
it("fetch-cors-no-cookie", async function () {
  const res = await fetchx.
    setCredentials('omit').
    setMode('cors').
    post("https://httpbin.org/post", {
      params: {
        "name": "Alex",
      },
      // credentials: 'omit', // is ok
      mode: "cors",
    }).then((res: Response) => res.json());
  expect(res.args.name).toBe("Alex");
});