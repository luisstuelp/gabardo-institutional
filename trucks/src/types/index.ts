/**
 * Types barrel export for the Gabardo Trucks application.
 * Import all types from this single entry point: `import type { ... } from '@/types'`
 */
export type {
    VehicleStatus,
    FuelType,
    TransmissionType,
    AppRole,
    Branch,
    Vehicle,
    VehicleImage,
    VehicleWithImages,
    UserProfile,
    UserRole,
    Favorite,
    Lead,
    VehicleFilters,
} from './database';

export { PRICE_RANGES, YEAR_RANGES, BRANDS, COMPANY_INFO, STATS } from './database';

export type {
    AuthContextType,
    AuthResult,
    SignUpPayload,
    SignInPayload,
    AuthState,
} from './auth';

export type {
    FetchVehiclesResult,
    LeadWithVehicle,
    AdminLead,
    FavoriteRecord,
    VehicleCardProps,
    ImageGalleryProps,
    FinancingSimulatorProps,
    VehicleImageManagerProps,
    VehicleFormProps,
    FipeSearchDialogProps,
    VehiclesState,
} from './vehicles';

export type {
    ChatMessage,
    ChatMessageRole,
    Chat,
    ChatWithMessages,
    SendMessagePayload,
    CreateChatPayload,
    ChatState,
    AIProviderConfig,
} from './chat';

export type {
    ThemeMode,
    ThemeColors,
    ThemeDefinition,
    ThemeContextType,
    ThemeState,
} from './theme';

export type {
    ApiResponse,
    ApiError,
    PaginatedResponse,
    ApiRequestOptions,
    ApiClientConfig,
    LogLevel,
    LogEntry,
} from './api';
