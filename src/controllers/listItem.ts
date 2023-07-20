import { FastifyReply, FastifyRequest } from "fastify";
import { createListItemValidationSchema } from "../schemas/listItem";
import { jsonMetaAndData } from "../utils";
import {
  IColumnItem,
  createListItem,
  deleteListItem,
  selectWhereIdWithListItem,
  sumAndPercentageItem,
  sumAndPercentageKategori,
  sumEveryMonth,
} from "../services/listItem";
import { selectWhereId } from "../services/list";

export const createListItemHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const nama_list = (request.body as any).nama_list as string;
    const status = (request.body as any).status as "completed" | "cancelled";
    const items = (request.body as any).items as Array<IColumnItem>;
    const resultValidation = createListItemValidationSchema.safeParse({
      nama_list,
      status,
    });
    if (!resultValidation.success) {
      const fmtResultValidation = resultValidation.error.format();
      // console.log(fmtResultValidation)
      return reply
        .code(422)
        .send(jsonMetaAndData(422, "error", fmtResultValidation));
    }
    const result = await createListItem({ nama_list, status }, items);
    return reply.code(200).send(jsonMetaAndData(200, "success", result));
  } catch (error) {
    reply.code(500).send(jsonMetaAndData(500, "error", error));
    console.log(error);
  }
};

export const deleteListItemHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const id = (request.params as any).id as string;
    if (isNaN(parseInt(id))) {
      return reply
        .code(404)
        .send(
          jsonMetaAndData(404, "error", { message: "The id must be number" })
        );
    }
    const resultId = await selectWhereId(id);
    if (!resultId) {
      return reply
        .code(404)
        .send(jsonMetaAndData(404, "error", { message: "not found" }));
    }
    const result = await deleteListItem(id);
    return reply.code(200).send(jsonMetaAndData(200, "success", result));
  } catch (error) {
    reply.code(500).send(jsonMetaAndData(500, "error", error));
    console.log(error);
  }
};

export const selectWhereIdListItemHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const id = (request.params as any).id as string;
    if (isNaN(parseInt(id))) {
      return reply
        .code(404)
        .send(
          jsonMetaAndData(404, "error", { message: "The id must be number" })
        );
    }
    const resultId = await selectWhereIdWithListItem(parseInt(id));
    if (!resultId) {
      return reply
        .code(404)
        .send(jsonMetaAndData(404, "error", { message: "not found" }));
    }
    return reply.code(200).send(jsonMetaAndData(200, "success", resultId));
  } catch (error) {
    reply.code(500).send(jsonMetaAndData(500, "error", error));
    console.log(error);
  }
};

export const sumAndPercentageItemOrKategori = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const nama = (request.query as any).nama as string;
    if (nama.includes("item")) {
      const result = await sumAndPercentageItem();
      return reply.code(200).send(jsonMetaAndData(200, "success", result));
    }
    if (nama.includes("kategori")) {
      const result = await sumAndPercentageKategori();
      return reply.code(200).send(jsonMetaAndData(200, "success", result));
    }
    return reply
      .code(404)
      .send(jsonMetaAndData(404, "error", { message: "not found" }));
  } catch (error) {
    reply.code(500).send(jsonMetaAndData(500, "error", error));
    console.log(error);
  }
};

export const sumEveryMonthHandler = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await sumEveryMonth();
    return reply.code(200).send(jsonMetaAndData(200, "success", result));
  } catch (error) {
    reply.code(500).send(jsonMetaAndData(500, "error", error));
    console.log(error);
  }
};
