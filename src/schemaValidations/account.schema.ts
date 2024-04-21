import z from 'zod'

export const AccountRes = z
  .object({
    id: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    avatar: z.string(),
    background: z.string(),
    userName: z.string(),
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256),
})

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>
