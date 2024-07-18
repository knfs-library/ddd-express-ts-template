import { Request, Response } from 'express';
import registerToJoinTeamUc from '../use-cases/registerToJoinTeam.uc';
import approveRegisterToJoinTeamUc from '../use-cases/approveRegisterToJoinTeam.uc';


const registerToTeam = async (req: Request, res: Response) => {
	const registerId = req.body.registerId
	const teamId = req.body.teamId

	const request = await registerToJoinTeamUc(registerId, teamId)

	return res.status(200).json({
		request,
		content: 'ok'
	});
};

const approveRegisterToTeam = async (req: Request, res: Response) => {
	const requestId = req.body.requestId
	const adminId = req.body.adminId
	const request = await approveRegisterToJoinTeamUc(requestId, adminId)

	return res.status(200).json({
		request,
		content: 'ok'
	});
};

export { registerToTeam, approveRegisterToTeam };
