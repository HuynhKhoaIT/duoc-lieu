import Layout from "@/components/layouts/Layout";
import ShopDetailPage from "@/components/Pages/ShopDetail/ShopDetailPage";
import apiConfig from "@/constants/apiConfig";

function ShopDetail({ products, productsList, error, errorList }) {
    return (
        <ShopDetailPage
            dataDetail={products}
            productsList={productsList}
            error={error}
            errorList={errorList}
        />
    );
}

export async function getStaticProps({ params }) {
    try {
        const [ res, resList ] = await Promise.all([
            fetch(
                apiConfig.products.getDetail.url.replace(":id", params.shopId),
                {
                    cache: "force-cache", 
                },
            ),
            fetch(apiConfig.products.getList.url, {
                cache: "force-cache",
            }),
        ]);

        const products = res.ok ? await res.json() : null;
        const productsList = resList.ok ? await resList.json() : [];

        return {
            props: {
                products: products?.data || null,
                productsList,
                error: res.ok ? null : `Error ${res.status}`,
                errorList: resList.ok ? null : `Error ${resList.status}`,
            },
            revalidate: 300, // sau 300s sẽ build lại
        };
    } catch (err) {
        return {
            props: {
                products: null,
                productsList: [],
                error: err.message,
                errorList: err.message,
            },
            revalidate: 60, // fallback nhanh hơn nếu lỗi
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
