import { Router } from 'express';
import multer from 'multer';
import { modController } from '../controllers/model.controller';

const router = Router();

// Настройка multer
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB лимит
    }
});

// ВАЖНО: upload.single('file') - 'file' должно совпадать с ключом в FormData
router.post('/model', upload.single('file'), modController.modelFetch);

export default router;