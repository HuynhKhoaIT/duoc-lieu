import Link from 'next/link';

import paths from '@/constants/paths';

export default function NotFound() {
    return (
        <div>
            <h1>Not found – 404!</h1>
            <div>
                <Link href={paths.home}>Go back to Home</Link>
            </div>
        </div>
    );
}
