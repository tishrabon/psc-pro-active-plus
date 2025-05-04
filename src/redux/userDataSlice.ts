import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";

export const fetchUSERDATA = createAsyncThunk(
  "fetchUserData",
  async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "userData", uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserDatabase;
      } else {
        throw new Error("Something is wrong, Try Again..");
      }
    } catch (error) {
      throw error;
    }
  },
);

export interface UserDatabase {
  uid: string;
  name: string;
  mail: string;
  complete: boolean;
}

export interface UserData {
  userDatabase: UserDatabase;
  loggedIn: boolean;
  loading?: boolean;
  loadingError?: string | null;
}

const initialState: UserData = {
  userDatabase: {
    uid: "",
    name: "",
    mail: "",
    complete: false,
  },

  loggedIn: false,
  loading: false,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    CUSTOMER: (state) => {
      console.log("Kire??", typeof state);
    },

    resetUSERDATA: (_state, action: PayloadAction<UserData>) => {
      return action.payload;
    },

    signupUSER: (state, action: PayloadAction<UserDatabase>) => {
      state.userDatabase = action.payload;
    },

    signoutUSER: (state) => {
      state.userDatabase = {
        uid: "",
        name: "",
        mail: "",
        complete: false,
      };
      state.loggedIn = false;
    },

    loggedSTATUS: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUSERDATA.pending, (state) => {
        state.loading = true;
        console.log("loading...");
      })
      .addCase(fetchUSERDATA.fulfilled, (state, action) => {
        state.loading = false;
        state.userDatabase = action.payload;
        console.log("data stored from firebase", state);
      })
      .addCase(fetchUSERDATA.rejected, (state, action) => {
        state.loading = false;
        state.loadingError = action.error.message || "Execution Failed";
      });
  },
});

export const {
  CUSTOMER,
  signupUSER,
  signoutUSER,
  loggedSTATUS,
  resetUSERDATA,
} = userDataSlice.actions;
export default userDataSlice.reducer;
