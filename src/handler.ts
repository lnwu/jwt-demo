import { APIGatewayEvent, Handler, Context } from "aws-lambda"
import * as awsServerlessExpress from "aws-serverless-express"
import { app } from "./app"

const server = awsServerlessExpress.createServer(app)
export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => awsServerlessExpress.proxy(server, event, context, "PROMISE").promise
