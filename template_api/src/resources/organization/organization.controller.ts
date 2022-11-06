import OrganizationService from './organization.service';
import Controller from '@/utils/interfaces/controller.interface';
import {
    Router,
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/organization/organization.validation';
import HttpException from '@/utils/exceptions/http.exception';

class OrganizationController implements Controller {
    public path = '/organizations';
    public router = Router();
    private OrganizationService = new OrganizationService();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Initialize routes through validation middleware
     */
    // @ts-ignore
    private initializeRoutes(): void {
        this.router.get(
            `${this.path}`,
            validationMiddleware(validate.read),
            // this.getOrganizations,
            this.getOrganizationById
        );
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.addOrganization
        );
        this.router.put(
            `${this.path}`,
            validationMiddleware(validate.update),
            this.updateOrganizationById
        );
    }

    /**
     * Get all organizations
     *
     * @param req Express Request
     * @param res Express Response
     */
    // @ts-ignore
    private getOrganizations = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const organizations =
                await this.OrganizationService.getOrganizations();

            res.status(200).json({
                organizations,
            });
        } catch (error: any) {
            console.error(
                '[organizations.controller][getOrganizations][Error] ',
                typeof error === 'object' ? JSON.stringify(error) : error
            );
            next(new HttpException(400, error.message));
        }
    };

    /**
     * Get organization based on id provided
     *
     * @param req Express Request
     * @param res Express Response
     */
    // @ts-ignore
    private getOrganizationById: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        try {
            const organization =
                await this.OrganizationService.getOrganizationById(req.body.id);

            res.status(200).json({
                organization,
            });
        } catch (error) {
            console.error(
                '[organization.controller][getOrganizationById][Error] ',
                typeof error === 'object' ? JSON.stringify(error) : error
            );
            res.status(500).json({
                message: 'There was an error when fetching organization',
            });
        }
    };

    /**
     * Inserts a new organization
     *
     * @param req Express Request
     * @param res Express Response
     */
    private addOrganization: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        try {
            const result = await this.OrganizationService.insertOrganization(
                req.body
            );

            res.status(200).json({
                result,
            });
        } catch (error) {
            console.error(
                '[organization.controller][addOrganization][Error] ',
                typeof error === 'object' ? JSON.stringify(error) : error
            );
            res.status(500).json({
                message: 'There was an error when adding new organization',
            });
        }
    };

    /**
     * Updates existing organization
     *
     * @param req Express Request
     * @param res Express Response
     */
    // @ts-ignore
    private updateOrganizationById: RequestHandler = async (
        req: Request,
        res: Response
    ) => {
        try {
            const result = await this.OrganizationService.updateOrganization({
                ...req.body,
            });

            res.status(200).json({
                result,
            });
        } catch (error) {
            console.error(
                '[organization.controller][updateOrganizationById][Error] ',
                typeof error === 'object' ? JSON.stringify(error) : error
            );
            res.status(500).json({
                message: 'There was an error when updating organization',
            });
        }
    };
}

export default OrganizationController;
