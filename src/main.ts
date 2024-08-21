export * from "./fetch-factory";
// export type * from "./fetch-factory";
import { FetchFactory } from "./fetch-factory";

interface ErrorResponseData {
  err: string;
  response: Response;
  mode?: string;
}

/**
 * 
 * @param response 
 * @param request 
 * @returns 
 */
export const responseJsonHandler = async <T = any>(response: Response, request: Request): Promise<T> => {
  if (response?.status) {
    const { status, url } = response;
    const text = await response.text();
    let responseObj: any;
    try {
      responseObj = JSON.parse(text);
    } catch (e) {
      const errmsg = "can't parse json: " + text + `(${url})`;
      console.error("can't parse json: " + errmsg);
      // request?.mode == 'no-cors'
      throw { err: errmsg, response, mode: request.mode } as ErrorResponseData;
    }
    return responseObj;
  } else {
    const msg = `can't connect: ${(request?.url)?.slice(0, 200)}`;
    throw { err: msg, response } as ErrorResponseData;
  }
};

/**
 * 
 * @param response 
 * @param request 
 * @returns 
 */
const responseDefaultHandler = <T = any>(response: Response, request: Request): Promise<T> => {
  return Promise.resolve(response) as Promise<T>;
};
/**
 * 
 * @param err 
 * @param req 
 */
function errorHandler(err: any, req: Request) {
  const url = req.url;
  const msg = `can't access: ${url.slice(0, 200)}\n`;
  console.error(msg, err);
  throw Error(err);
}

export const fetchx = new FetchFactory(
  {
    mode: "cors",
    credentials: 'include', // include cookie
  },
  responseDefaultHandler,
  errorHandler,
);

export default fetchx;