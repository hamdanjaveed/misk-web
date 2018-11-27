import {
  // get,
  Navbar,
  OfflineComponent,
  ResponsiveContainer,
  TabLoaderComponent
} from "@misk/components"
import axios, { AxiosRequestConfig } from "axios"
import * as React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { IState } from "../ducks"

export interface ILoaderProps extends IState {}

const TabContainer = styled(ResponsiveContainer)`
  position: relative;
  top: 110px;
  padding-left: 5px;
`

export const get = async (url: string, config: AxiosRequestConfig = {}) => {
  console.log("get test")
  try {
    const { data } = await axios.get(url, config)
    return { data, error: null as any }
  } catch (error) {
    return { data: null as any, error }
  }
}

export const initialRequestState = () => {
  return {
    data: null as any,
    error: null as any
  }
}

const adminDashboardTabsUrl =
  "https://square.github.io/misk-web/examples/data/demo/adminDashboardTabs.json"
const serviceMetadataUrl =
  "https://square.github.io/misk-web/examples/data/demo/serviceMetadata.json"

class LoaderContainer extends React.Component<ILoaderProps> {
  state = {
    adminDashboardTabs: initialRequestState(),
    error: null as any,
    serviceMetadata: initialRequestState()
  }

  async componentDidMount() {
    this.setState({
      ...this.state,
      adminDashboardTabs: await get(adminDashboardTabsUrl),
      serviceMetadata: await get(serviceMetadataUrl)
    })
    console.log(this.state)
  }

  render() {
    if (this.state.adminDashboardTabs.data && this.state.serviceMetadata.data) {
      const { adminDashboardTabs } = this.state.adminDashboardTabs.data
      const { serviceMetadata } = this.state.serviceMetadata.data
      return (
        <span>
          <Navbar
            environment={serviceMetadata.environment}
            links={adminDashboardTabs}
            homeName={serviceMetadata.app_name}
            homeUrl={serviceMetadata.admin_dashboard_url}
            navbar_items={serviceMetadata.navbar_items}
            status={serviceMetadata.navbar_status}
          />
          <TabContainer>
            <TabLoaderComponent tabs={adminDashboardTabs} />
          </TabContainer>
        </span>
      )
    } else {
      return (
        <span>
          <Navbar error={this.state.adminDashboardTabs.error} />
          <TabContainer>
            <OfflineComponent
              error={this.state.adminDashboardTabs.error}
              title={"Error Loading Admin Tabs"}
              endpoint={adminDashboardTabsUrl}
            />
            <OfflineComponent
              error={this.state.serviceMetadata.error}
              title={"Error Loading Service Metadata"}
              endpoint={serviceMetadataUrl}
            />
          </TabContainer>
        </span>
      )
    }
  }
}

const mapStateToProps = (state: IState) => ({
  loader: state.loader.toJS(),
  router: state.router
})

export default connect(mapStateToProps)(LoaderContainer)