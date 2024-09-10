import * as Tabs from "@radix-ui/react-tabs";
interface PickupTabsProps {
  children: React.ReactNode;
}

function PickupTabs({ children }: PickupTabsProps) {
  return (
    <Tabs.Root className="w-full mt-10" defaultValue="Pickups">
      <Tabs.List className="border-b dark:border-b-gray-800 overflow-auto flex flex-nowrap">
        <Tabs.Trigger
          value="Pickups"
          className="pb-2 truncate px-3 hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]=font-bold data-[state=active]:text-primary"
        >
          Pickups
        </Tabs.Trigger>
        <Tabs.Trigger
          value="Mapa"
          className="pb-2 truncate px-3 hover:text-primary border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-primary"
        >
          Mapa pickup
        </Tabs.Trigger>
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
}

export function PickupSelectContent({ children }: PickupTabsProps) {
  return (
    <Tabs.Content value="Pickups" className="mt-6">
      {children}
    </Tabs.Content>
  );
}
export function PickupMapContent({ children }: PickupTabsProps) {
  return (
    <Tabs.Content value="Mapa" className="mt-6">
      {children}
    </Tabs.Content>
  );
}

export default PickupTabs;
