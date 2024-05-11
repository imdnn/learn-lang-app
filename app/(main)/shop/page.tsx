import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image";
import { Items } from "@/app/(main)/shop/items";

const ShopPage = async () => {
    const userProgressReq = getUserProgress();

    const [userProgress] = await Promise.all([userProgressReq]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className='w-full flex flex-col items-center'>
                    <Image src='/shop.svg' alt='Магазин' width={90} height={90} />
                    <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>Магазин</h1>
                    <p className='text-muted-foreground text-center text-lg mb-6'>Используйте ваши очки для покупки</p>
                    <Items points={userProgress.points} hearts={userProgress.hearts} hasActiveSubscription={false} />
                </div>
            </FeedWrapper>
        </div>
    );
};

export default ShopPage;