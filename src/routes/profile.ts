import { Router, Response, Request } from "express";
import { auth as authToken, Reqs } from "../auth/auth";
import { userAllowedProps } from "../utils/allowedPropsToUpdate";
import UserModel from "../models/users";

const router = Router();

/**
 * @swagger
 * /api/profile/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request
 */
router.get("/profile", authToken, async (req: Reqs, res: Response) => {
  try {
    console.log(req.user);
    res.json(req.user);
  } catch (e) {
    res.status(400).json(e);
  }
});

/**
 * @swagger
 * /api/profile/profile/{userId}:
 *   patch:
 *     summary: Update user profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 */
router.patch("/profile/:userId", async (req: Request, res: Response) => {
  try {
    if (!userAllowedProps.profile.isValid({ data: Object.keys(req.body) })) {
      res.status(400).json(userAllowedProps.profile.error);
    }
    const userId = req.params.userId;
    const user = await UserModel.findByIdAndUpdate({ _id: userId }, req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
