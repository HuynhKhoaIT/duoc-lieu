import { Fragment } from "react";
import useSWR from "swr";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import CartPage from "@/components/Pages/User/Cart";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Cart() {
    const { data, error, isLoading, mutate } = useSWR("/api/cart", fetcher);

    if (error) return <p>Lỗi tải giỏ hàng!</p>;

    return (
        <Fragment>
            <Breadcrumb title="Giỏ hàng" />
            {isLoading ? (
                <p>...</p>
            ) : (
                <CartPage cartsData={data?.data || []} refetch={mutate} />
            )}
            <LogoCarousel />
        </Fragment>
    );
}

Cart.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Cart;
