import { BottomMenu } from "@/components/ui/bottom-menu";

/**
 * Mobile-native sticky bottom action dock for mobile devices (< 640px).
 * Renders ONE SINGLE unified glassmorphic bottom menu bar.
 */
export function MobileQuickActionDock() {
  return (
    <div className="sm:hidden fixed bottom-3 left-0 right-0 z-50 px-3 flex flex-col items-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-sm">
        <BottomMenu />
      </div>
    </div>
  );
}
