import authRoutes from './authRoutes';
import projectRoutes from './projectRoutes';

// register all routes
export default app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
};
