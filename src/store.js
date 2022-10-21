import { configureStore } from '@reduxjs/toolkit'
import loginReduser from './features/login/loginSlice'
import calendarReduser from './features/dashboard/dashboardCalendarSlice'
import dashCampaignsReduser from './features/dashboard_campaigns/dashboardCampaignsSlice'
import dashConnectionsReduser from './features/dashboard_connections/dashboardConnectionsSlice'
import campaignsAllReduser from './features/campaigns_all/CampaignsAllSlice'
import campaignsScheduleReduser from './features/campaigns_schedule/CampaignsScheduleSlice';
import accountsReduser from './features/accounts/AccountsSlice';
import connectionsReduser from './features/connections/ConnectionsSlice';
import templatesArchivedReduser from './features/templates_archived/TemplatesArchivedSlice';
import templatesRelevantReduser from './features/templates_relevant/TemplatesRelevantSlice';
import mailingListReduser from './features/mailing_list/MailingListSlice'

export default configureStore({
    reducer: {
        login:loginReduser,
        calendar:calendarReduser,
        dashCampaigns:dashCampaignsReduser,
        dashConnections:dashConnectionsReduser,
        campaignsAll:campaignsAllReduser,
        campaignsSchedule:campaignsScheduleReduser,
        accounts:accountsReduser,
        connections:connectionsReduser,
        templatesArchived:templatesArchivedReduser,
        templatesRelevant:templatesRelevantReduser,
        mailingList:mailingListReduser
    }
})
