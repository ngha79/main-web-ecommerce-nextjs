import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

export function Account() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full p-4 flex flex-col"
    >
      <AccordionItem
        value="item-1"
        className="px-1"
      >
        <AccordionTrigger className="hover:text-red-500">
          Tài khoản của tôi
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <Link
              href={'/user/account/profile'}
              className="hover:bg-gray-200 hover:text-red-500 p-1 rounded-sm"
            >
              Hồ sơ
            </Link>
            <Link
              href={'/user/account/address'}
              className="hover:bg-gray-200 hover:text-red-500 p-1 rounded-sm"
            >
              Địa chỉ
            </Link>
            <Link
              href={'/user/account/password'}
              className="hover:bg-gray-200 hover:text-red-500 p-1 rounded-sm"
            >
              Đổi mật khẩu
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <Link
        href={'/user/account/purchase'}
        className="px-1 py-4 border-b font-medium hover:underline hover:text-red-500"
      >
        Đơn hàng
      </Link>
      <Link
        href={'/user/account/notifications'}
        className="px-1 py-4 border-b font-medium hover:underline hover:text-red-500"
      >
        Thông báo
      </Link>
      <Link
        href={'/user/account/vouchers'}
        className="px-1 py-4 border-b font-medium hover:underline hover:text-red-500"
      >
        Kho Voucher
      </Link>
    </Accordion>
  )
}
