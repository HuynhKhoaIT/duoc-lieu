import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function FAB({ onClick }) {
    return (
        <div className="fixed bottom-22 right-6 z-51">
            <Button
                className="rounded-full h-14 w-14 p-0 shadow-lg"
                size="icon"
                variant="default"
                onClick={onClick}
            >
                <Plus className="h-6 w-6" />
            </Button>
        </div>
    );
}
