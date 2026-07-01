/**
 * UI Redux slice.
 * Manages global UI state: sidebar, modals, loading states.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
    isSidebarOpen: boolean;
    isChatOpen: boolean;
    isLeadModalOpen: boolean;
    leadModalVehicleId: string | null;
    globalLoading: boolean;
}

const initialState: UIState = {
    isSidebarOpen: false,
    isChatOpen: false,
    isLeadModalOpen: false,
    leadModalVehicleId: null,
    globalLoading: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setSidebarOpen(state, action: PayloadAction<boolean>) {
            state.isSidebarOpen = action.payload;
        },
        toggleChat(state) {
            state.isChatOpen = !state.isChatOpen;
        },
        setChatOpen(state, action: PayloadAction<boolean>) {
            state.isChatOpen = action.payload;
        },
        openLeadModal(state, action: PayloadAction<string | null>) {
            state.isLeadModalOpen = true;
            state.leadModalVehicleId = action.payload;
        },
        closeLeadModal(state) {
            state.isLeadModalOpen = false;
            state.leadModalVehicleId = null;
        },
        setGlobalLoading(state, action: PayloadAction<boolean>) {
            state.globalLoading = action.payload;
        },
    },
});

export const {
    toggleSidebar,
    setSidebarOpen,
    toggleChat,
    setChatOpen,
    openLeadModal,
    closeLeadModal,
    setGlobalLoading,
} = uiSlice.actions;
export default uiSlice.reducer;
