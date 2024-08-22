'use client';

import NavigationMenu from "@/app/ui/common/NavigationMenu";
import { FacebookFilled, HomeFilled } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Divider from "antd/es/divider";
import Form from "antd/es/form";
import Result from "antd/es/result";
import Button from "antd/es/button";
import sendEmail from "@/services/mail.service";
import { useState } from "react";
import { Link } from "@/app/navigation";

export default function Contact({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
    const t = useTranslations('contact');
    const [form] = Form.useForm();
    const [status, setStatus] = useState<string>('idle');

    const handleSubmit = (data: any) => {
        setStatus('loading');
        sendEmail(data.sender, data.email, data.subject, data.message).then(() => {
            form.resetFields();
            setStatus('success');
        }).catch((err: any) => {
            setStatus('error');
        });
    }

    return <>
        <NavigationMenu color="white" locale={locale as any} />
        <div
            style={{ minHeight: 'max(800px, 100vh)' }}
            className='w-screen overflow-y-auto justify-center items-center relative flex flex-row max-w-[1920px] m-auto pt-[80px] pb-[5px]'>
            <div className="w-11/12 xl:w-1/2 flex flex-col items-center xl:items-start mb-5">
                <h1 className="text-white text-xl text-extrabold md:text-4xl mb-5">{t("title")}</h1>
                <div className="bg-white w-full p-5 flex flex-col">
                    <span className="text-xs md:text-base">{t("website")}: <a target="_blank" href={t("content.website")}><HomeFilled style={{ color: "#4096ff" }} /></a></span>
                    <span className="text-xs md:text-base">{t("fanpage")}: <a target="_blank" href={t("content.fanpage")}><FacebookFilled style={{ color: "#4096ff" }} /></a></span>
                    <span className="text-xs md:text-base">{t("email")}: {t("content.email")}</span>
                    <span className="text-xs md:text-base">{t("planner")}: {t("content.planner")}</span>
                    <span className="text-xs md:text-base">{t("phone")}: {t("content.phone")}</span>
                    <Divider />
                    <h1 className="text-xl text-extrabold md:text-4xl mb-5">{t("sendUsALetter")}</h1>
                    {
                        status == 'success' && <Result
                            status="success"
                            title={t("success")}
                            subTitle={t("successSubtitle")}
                            extra={[
                                <Link href="/">
                                    <Button type="primary">
                                        {t("backToHome")}
                                    </Button>
                                </Link>,
                            ]}
                        />
                    }
                    {
                        status == 'error' && <Result
                            status="error"
                            title={t("error")}
                            subTitle={t("errorSubtitle")}
                            extra={[
                                <Link href="/">
                                    <Button type="primary">
                                        {t("backToHome")}
                                    </Button>
                                </Link>,
                            ]}
                        />
                    }
                    {(status == 'idle' || status == 'loading') && <Form
                        labelCol={{ span: 8 }}
                        onFinish={handleSubmit}
                        form={form}
                    >
                        <Form.Item name="sender" label={t("sender")} colon={false} rules={[{ required: true, message: t('required') }]}>
                            <input type="text" className="w-full p-2 border-[1px] border-gray-300" />
                        </Form.Item>
                        <Form.Item name="email" label={t("email")} colon={false} rules={[{ required: true, type: 'email', message: t('typeEmail') }]}>
                            <input type="email" className="w-full p-2 border-[1px] border-gray-300" />
                        </Form.Item>
                        <Form.Item name="subject" label={t("subject")} colon={false} rules={[{ required: true, message: t('required') }]}>
                            <input type="text" className="w-full p-2 border-[1px] border-gray-300" />
                        </Form.Item>
                        <Form.Item name="message" label={t("message")} colon={false} rules={[{ required: true, message: t('required') }]}>
                            <textarea className="w-full p-2 border-[1px] border-gray-300" />
                        </Form.Item>
                        <div className="w-full flex flex-row justify-end">
                            <Form.Item>
                                <Button loading={status == 'loading'} htmlType="submit">{t("send")}</Button>
                            </Form.Item>
                        </div>
                    </Form>}
                </div>
            </div >

            <Image
                src="/images/library_background.png"
                objectFit="cover"
                objectPosition="center"
                layout="fill"
                alt="Background"
                className="absolute -z-10"
            />
        </div>
    </>
}