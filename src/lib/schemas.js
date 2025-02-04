import { z } from 'zod';

const russianPhoneRegex = new RegExp(/^(?:\+7|8)\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/);
const allowedMimeTypes = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/avif',
	'image/jpg',
	'image/svg',
	'image/gif', // Images
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Documents
	'application/vnd.ms-excel',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Excel
];

export const promocodeSchema = z.string().min(1, { message: 'Промокод обязателен' });
export const emailSchema = z
	.string({ required_error: 'Email обязателен' })
	.email({ message: 'Введите корректный Email' });

export const cartDataSchema = z.object({
	email: z
		.string({ required_error: 'Email обязателен' })
		.email({ message: 'Введите корректный Email' })
		.optional(),
	firstName: z.string({ required_error: 'Имя обязательно' }),
	secondName: z.string({ required_error: 'Фамилия обязательна' }),
	phone: z
		.string({ required_error: 'Телефон обязателен' })
		.regex(russianPhoneRegex, 'Введите корректный номер'),
	isMaster: z.boolean()
});

export const registerUserSchema = z.object({
	email: z
		.string({ required_error: 'Email обязателен' })
		.email({ message: 'Введите корректный Email' }),
	password: z
		.string({ required_error: 'Пароль обязателен' })
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:
				'Пароль должен длинее 8 символов и содержать как минимум 1 латинскую букву, 1 цифру и 1 специальный символ'
		})
});

export const changePasswordSchema = z.object({
	email: z
		.string({ required_error: 'Email обязателен' })
		.email({ message: 'Введите корректный Email' })
});

export const fileSchema = z.object({
	certificatesType: z.string().refine((type) => allowedMimeTypes.includes(type), {
		message: 'Неподходящее разрешение файла, приложите картинку или документ'
	}),
	certificatesSize: z.number().max(3 * 1024 * 1024, {
		message: `Один из превышает допустимый размер 3 МБ.`
	})
});

export const loginUserSchema = z.object({
	identifier: z
		.string({ required_error: 'Сертификаты обязательны' })
		.email({ message: 'Введите корректный Email' }),
	password: z.string({ required_error: 'Пароль обязателен' })
});

export const courseSignUpSchema = z.object({
	name: z.string({ required_error: 'Имя обязательно' }),
	phone: z
		.string({ required_error: 'Телефон обязателен' })
		.regex(russianPhoneRegex, 'Введите корректный номер'),
	course: z.string()
});

export const sendMessageSchema = z.object({
	name: z.string({ required_error: 'Имя обязательно' }),
	phone: z
		.string({ required_error: 'Телефон обязателен' })
		.regex(russianPhoneRegex, 'Введите корректный номер'),
	message: z.string()
});

const imageTypes = ['image/jpg', 'image/png', 'image/webp', 'application/pdf'];

export const sertificateSchema = z.object({
	dogs_kennel_sertificate: z
		.any()
		.refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
		.refine(
			(file) => imageTypes.includes(file?.type),
			'Недоступный формат. Поддерживаемые форматы: jpg, png, webp, pdf'
		),
	cats_kennel_sertificate: z
		.any()
		.refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
		.refine(
			(file) => imageTypes.includes(file?.type),
			'Недоступный формат. Поддерживаемые форматы: jpg, png, webp, pdf'
		)
});

export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email обязателен' })
		.email({ message: 'Введите корректный Email' })
});

export const updatePasswordSchema = z
	.object({
		password: z
			.string({ required_error: 'Введите пароль' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Пароль должен длинее 8 символов и содержать как минимум 1 латинскую букву, 1 цифру и 1 специальный символ'
			}),
		passwordConfirm: z.string({ required_error: 'Повторите пароль' }),
		code: z.string()
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Пароли должны совпадать',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Пароли должны совпадать',
				path: ['passwordConfirm']
			});
		}
	});

const ImageTypesSchema = z.enum(imageTypes);
