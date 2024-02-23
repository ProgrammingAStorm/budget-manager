import {
  FormContainer,
  AutocompleteElement,
  TextFieldElement,
} from "react-hook-form-mui";
import Month from "../models/month";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import TransactionSubCategorySelector from "./TransactionSubCategorySelector";
import { Button, Grid } from "@mui/material";
import { postTransaction } from "../redux/thunks/transactionThunks";
import Year from "../models/year";
import Category from "../models/category";
import SubCategory from "../models/subCategory";

export interface PostTransactionForm {
  year: Year | null;
  month: MonthObject | null;
  category: Category | null;
  subCategory: SubCategory | null;
  amount: number | null;
  name: string | null;
}

interface MonthObject {
  id: string;
  label: string;
}

export default function AddTransactionComponent() {
  const years = useAppSelector((s) => s.years);
  const categories = useAppSelector((s) => s.categories);

  const dispatch = useAppDispatch();

  const defaultValues: PostTransactionForm = {
    year: null,
    month: null,
    category: null,
    subCategory: null,
    amount: null,
    name: null,
  };

  return (
    <FormContainer
      defaultValues={defaultValues}
      onSuccess={(d) => dispatch(postTransaction(d))}
    >
      <Grid container spacing={2} padding={"1rem"}>
        <Grid item xs={6} sm={12}>
          <AutocompleteElement
            label="Year"
            name="year"
            options={years.map(({ id, value }) => {
              return { id, label: value };
            })}
            required
          />
        </Grid>

        <Grid item xs={6} sm={12}>
          <AutocompleteElement
            label="Month"
            name="month"
            options={Object.values(Month)
              .filter((month) => typeof month !== "number")
              .map((month, index) => {
                return { id: index, label: month };
              })}
            required
          />
        </Grid>

        <Grid item xs={6} sm={12}>
          <AutocompleteElement
            label="Category"
            name="category"
            options={categories.map(({ id, name }) => {
              return { id, label: name };
            })}
            required
          />
        </Grid>

        <Grid item xs={6} sm={12}>
          <TransactionSubCategorySelector />
        </Grid>

        <Grid item xs={6} sm={12}>
          <TextFieldElement
            label={"Amount"}
            name={"amount"}
            required
            type={"number"}
            style={{ width: "100%" }}
          />
        </Grid>

        <Grid item xs={6} sm={12} justifySelf={"center"} alignSelf={"center"}>
          <TextFieldElement
            label={"Name"}
            name={"name"}
            required
            type={"text"}
            style={{ width: "100%" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  );
}
