import fetchx from "../main";
it("fetchPostQuery", async function () {
  const res = await fetchx.post("https://httpbin.org/post", {
    params: {
      "name": "Alex",
    },
  }).then((res: Response) => res.json());
  expect(res.args.name).toBe("Alex");
});

it("fetchPostRawData", async function () {
  const rawData = "raw data";
  const res = await fetchx.post("https://httpbin.org/post", {
    data: rawData,
    headers: {
      "Content-Type": "text/plain"
    },
  }).then((res: Response) => res.json());
  expect(res.data).toBe(rawData);
});

it("fetchPostFormData", async function () {
  const data = await fetchx<any>("https://httpbin.org/post", {
    method: "POST",
    data: {
      "name": "Alex",
    },
  }).then((res: Response) => res.json());
  expect(data.form.name).toBe("Alex");
});

it("fetchPostJson", async function () {
  const data = await fetchx<any>("https://httpbin.org/post", {
    method: "POST",
    json: {
      "name": "Alex",
    },
  }).then((res: Response) => res.json());
  expect(data.json.name).toBe("Alex");
});