export default function OnlyMobile() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 text-center">
            <div className="!p-6 bg-white rounded-lg shadow-lg max-w-md">
                <h1 className="text-2xl font-bold text-red-600">
                    Trang web chỉ hỗ trợ trên mobile 📱
                </h1>
                <p className="!mt-2 text-gray-600">
                    Vui lòng truy cập bằng thiết bị di động để tiếp tục sử dụng
                    dịch vụ.
                </p>
            </div>
        </div>
    );
}
