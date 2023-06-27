import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { reqHistograms, reqObjectSearch, reqDocuments } from "../../_axiosRequests/requests"

const initialState = {
    histogramsLoading: false,
    docsLoading: false,
    searchParams: {
        intervalType: 'month',
        histogramTypes: ['totalDocuments', 'riskFactors'],
        issueDateInterval: {
            startDate: '',
            endDate: ''
        },
        similarMode: 'duplicates',
        limit: 0,
        sortType: 'sourceInfluence',
        sortDirectionType: 'desc',
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [
                    {
                        type: 'company',
                        sparkId: null,
                        entityId: null,
                        inn: 0,
                        maxFullness: false,
                        inBusinessNews: false
                    }
                ],
                onlyMainRole: false,
                tonality: 'any',
                onlyWithRiskFactors: false,
                riskFactors: {
                    and: [],
                    or: [],
                    not: []
                },
                themes: {
                    and: [],
                    or: [],
                    not: []
                },
                themesFilter: {
                    and: [],
                    or: [],
                    not: []
                },
                searchArea: {
                    includedSources: [],
                    excludedSources: [],
                    includedSourceGroups: [],
                    excludedSourceGroups: []
                },
                attributeFilters: {
                    excludeTechNews: false,
                    excludeAnnouncements: false,
                    excludeDigests: false
                }
            }
        }
    },
    histograms: [],
    documents: []
}

export const searchRequest = createAsyncThunk(
    'search/searchRequest',
    async (state) => {
        const response = await reqHistograms(state);
        // console.log(response.data.data);
        return response.data.data;
    }
)

export const docRequest = createAsyncThunk(
    'search/docRequest',
    async (state) => {
        const response = await reqObjectSearch(state);
        let ids = [];
        await response.data.items.map(id => ids.push(id.encodedId));
        const docs = await reqDocuments({ids: ids.slice(0,100)});
        // console.log(ids);
        return docs.data;
    }
)

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getStartDate(state, action) {
            state.searchParams.issueDateInterval.startDate = action.payload;
        },
        getEndDate(state, action) {
            state.searchParams.issueDateInterval.endDate = action.payload;
        },
        getINN(state, action) {
            state.searchParams.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].inn = action.payload;
        },
        getLimit(state, action) {
            state.searchParams.limit = action.payload;
        },
        getTonality(state, action) {
            state.searchParams.searchContext.targetSearchEntitiesContext.tonality = action.payload;
        },
        getChecks(state, action) {
            state.searchParams.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].maxFullness = action.payload.fullness;
            state.searchParams.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].inBusinessNews = action.payload.inNews;
            state.searchParams.searchContext.targetSearchEntitiesContext.onlyMainRole = action.payload.mainRole;
            state.searchParams.searchContext.targetSearchEntitiesContext.onlyWithRiskFactors = action.payload.risk;
            state.searchParams.searchContext.targetSearchEntitiesContext.attributeFilters.excludeTechNews = action.payload.techNews;
            state.searchParams.searchContext.targetSearchEntitiesContext.attributeFilters.excludeAnnouncements = action.payload.announcements;
            state.searchParams.searchContext.targetSearchEntitiesContext.attributeFilters.excludeDigests = action.payload.digests;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchRequest.pending, (state) => {
                state.histogramsLoading = true;
            })
            .addCase(searchRequest.fulfilled, (state, action) => {
                state.histograms = action.payload;
                // console.log(action);
                state.histogramsLoading = false;
            })
            .addCase(searchRequest.rejected, (state, action) => {
                state.histogramsLoading = false;
                console.log(action.payload);
            })
            .addCase(docRequest.pending, (state) => {
                state.docsLoading = true;
            })
            .addCase(docRequest.fulfilled, (state, action) => {
                state.docsLoading = false;
                state.documents = action.payload;
                // console.log(action);
            })
            .addCase(docRequest.rejected, (state, action) => {
                state.docsLoading = false;
                console.log(action.payload);
            })
    }
})

export const { getStartDate, getEndDate, getINN, getLimit, getTonality, getChecks } = searchSlice.actions;
export default searchSlice.reducer




