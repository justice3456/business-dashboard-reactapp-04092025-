//imports
import DashboardTexts from "../dashboard.components/DashboardTexts";
import LeftMenu from "../dashboard.components/LeftMenu";
import InventoryCard from "../inventory.components/InventoryCard";

//components
export default function () {
  return (
    <>
    <p className="add-inventory">Add + Inventory</p>
    <div>
      <DashboardTexts pageTitle="Inventory" salesPerWeek="display-off" />
      <InventoryCard />
      <InventoryCard />
      <InventoryCard />
      <LeftMenu />
    </div>
    </>
  );
}
