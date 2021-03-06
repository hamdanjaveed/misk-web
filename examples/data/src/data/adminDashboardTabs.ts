import { IDashboardTab } from "@misk/common"

export const adminDashboardTabs: { adminDashboardTabs: IDashboardTab[] } = {
  adminDashboardTabs: [
    {
      name: "First Tab",
      slug: "first-tab",
      url_path_prefix: "/_admin/first-tab/"
    },
    {
      name: "Second Tab",
      slug: "second-tab",
      url_path_prefix: "/_admin/second-tab/"
    }
  ]
}
