import { Request, Response, Router } from "express";
import { auth, getCurrentUserId } from "../auth/auth";
import QuestionModel from "../models/questions-model";
import AnswersModel from "../models/answers-model";

const router = Router();

/**
 * @swagger
 * /api/game/start:
 *   post:
 *     summary: Start a game session
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *               - dateTime
 *             properties:
 *               groupId:
 *                 type: string
 *                 format: ObjectId
 *                 description: Group ID
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time for the game session
 *     responses:
 *       200:
 *         description: Game session started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 answers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Answer'
 *                 questions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 */
router.post("/start", auth, async (req: Request, res: Response) => {
  const { groupId, dateTime } = req.body;
  const userId = await getCurrentUserId(req, res);
  const commonQuery = {
    dateTime: { $regex: dateTime.split("T")[0] },
    groupId: groupId,
  };
  const [questions, answers] = await Promise.all([
    QuestionModel.find({
      askedBy: userId,
      ...commonQuery,
    }),
    AnswersModel.find({
      answeredBy: userId,
      ...commonQuery,
    }),
  ]);
  res.json({ answers, questions });
});

export default router;
