import Layout from "@/components/layouts/Layout";
import ShopDetailPage from "@/components/Pages/ShopDetail/ShopDetailPage";
import apiConfig from "@/constants/apiConfig";

function ShopDetail({ shop, error }) {
    return <ShopDetailPage dataDetail={shop} error={error} />;
}

export async function getStaticProps({ params }) {
    try {
        const res = await fetch(
            apiConfig.products.getDetail.url.replace(":id", params.shopId),
            { cache: "force-cache" }
        );

        const shop = res.ok ? await res.json() : null;

        return {
            props: {
                shop: shop?.data || null,
                error: res.ok ? null : `Error ${res.status}`,
            },
            revalidate: 300, // 5 phút regenerate lại
        };
    } catch (err) {
        return {
            props: {
                shop: null,
                error: err.message,
            },
            revalidate: 60, // thử regenerate nhanh hơn nếu lỗi
        };
    }
}

export async function getStaticPaths() {
    return { paths: [], fallback: "blocking" };
}

ShopDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default ShopDetail;
