import Layout from "@/components/layouts/Layout";
import ShopDetailPage from "@/components/Pages/ShopDetail/ShopDetailPage";

function shopDetail() {

    return (
        <ShopDetailPage/>
    );
}

shopDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default shopDetail;
