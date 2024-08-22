'use client';

import { useRouter } from 'next/navigation';
import Modal from "antd/es/modal";
import { Pattern } from '@/services/pattern.service';
import { useTranslations } from 'next-intl';
import PatternPage from './PatternPage';

export default function PatternModal({ pattern }: { pattern: Pattern }) {
    const router = useRouter();
    const t = useTranslations('patterns')
    const handleCancel = () => {
        router.back();
    };

    return <Modal
        open={true}
        footer={null}
        onCancel={handleCancel}
        closable={true}
        centered
        width="min(calc(100vw - 32px), 800px)"
    >
        <PatternPage pattern={pattern} />
    </Modal >;
}