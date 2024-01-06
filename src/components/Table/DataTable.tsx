/* eslint-disable react-hooks/exhaustive-deps */
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Pagination, Card, Button, Space, Table, Flex, Dropdown } from "antd";
import { iUser } from "../../utils/models";
import type { ColumnType, ColumnsType } from "antd/es/table";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
import SearchNumber from "./SearchNumber";
import {
  getColByKey,
  getColByParam,
  rawColumnsByTable,
} from "_constants/index";
import SearchSelect from "./SearchSelect";
import SearchDate from "./SearchDate";
import useFilter from "src/hooks/useFilter";
import SearchMultiSelect from "./SearchMultiSelect";
import SearchIndustry from "./SearchIndustry";
import SearchAddress from "./SearchAddress";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import SearchCurrency from "./SearchCurrency";
import { AxiosError } from "axios";

type DataType = iUser;

interface DataTableProps {
  titleTable: string;
  tableName: string;
  data: any[];
  filterSelectData?: any;
  rawColumns: any[];
  createBtn: { handler: () => void; title: string } | undefined;
  showDetail: (id: string) => void;
  paginationOption?: {
    handlePageChange: (page: number) => void;
    total: number;
    pageSize: number;
  };
  noFilter?: boolean;
  loading?: boolean;
}

const DataTable = ({
  titleTable,
  tableName,
  data,
  filterSelectData,
  rawColumns,
  showDetail,
  createBtn,
  paginationOption,
  noFilter,
  loading,
}: DataTableProps) => {
  const { getAllParams, removeAllFilter, getPathname } = useFilter();
  const [filterCol, setFilterCol] = useState(
    rawColumnsByTable(tableName).map((column: any) => column.key)
  );

  const getColumnSearchProps = (columnKey: string): ColumnType<DataType> => {
    const col = getColByKey(rawColumns, columnKey);
    if (!noFilter)
      return {
        filterDropdown: ({ close }) => (
          <>
            {!col.type && (
              <SearchInput
                closeFn={close}
                table={tableName}
                columnKey={columnKey}
              />
            )}

            {col.type === "number" && (
              <SearchNumber closeFn={close} columnKey={columnKey} />
            )}

            {col.type === "currency" && (
              <SearchCurrency closeFn={close} columnKey={columnKey} />
            )}

            {col.type === "select" && (
              <SearchSelect
                closeFn={close}
                filterSelectData={filterSelectData}
                table={tableName}
                columnKey={columnKey}
              />
            )}

            {col.type === "industry" && (
              <SearchIndustry
                closeFn={close}
                table={tableName}
                columnKey={columnKey}
              />
            )}

            {col.type === "address" && <SearchAddress closeFn={close} />}

            {col.type === "multiple_select" && (
              <SearchMultiSelect
                closeFn={close}
                filterSelectData={filterSelectData}
                table={tableName}
                columnKey={columnKey}
              />
            )}

            {col.type === "date" && (
              <SearchDate
                closeFn={close}
                table={tableName}
                columnKey={columnKey}
              />
            )}
          </>
        ),
        filterIcon: () => {
          return (
            <SearchOutlined
              style={{
                color:
                  Object.keys(getAllParams()).filter(
                    (item) =>
                      getColByParam(
                        rawColumnsByTable(tableName),
                        item.replace(/_(from|to)$/, "")
                      )?.key === columnKey
                  ).length > 0 ||
                  (columnKey === "location" && getAllParams()["city"])
                    ? "#1677ff"
                    : undefined,
              }}
            />
          );
        },
      };
    else return {};
  };

  const [render, setRender] = useState(true);

  const changeCol = async (selectedKeys: string[]) => {
    try {
      const res = await otherApi.changeCol(
        getPathname().slice(1),
        selectedKeys
      );
      setFilterCol(res.data.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) console.error(error);
    }
  };

  const loginMutation = useMutation({
    mutationFn: (selectedKeys: string[]) => changeCol(selectedKeys),
  });

  const handleMenuSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
    console.log("Selected keys:", selectedKeys);
    loginMutation.mutate(selectedKeys);
    setRender(!render);
  };

  const items = rawColumns.map((column: any, index: number) => ({
    disabled: index === 0 || index === 1,
    key: column.key,
    label: column.title,
  }));

  const {
    isPending: colIsPending,
    isLoading: colIsLoading,
    data: colData,
  } = useQuery({
    queryKey: ["col", getPathname()],
    queryFn: async () =>
      await otherApi
        .getCol(getPathname().slice(1))
        .then((res) => res.data.data),
    enabled:
      getPathname() === "/candidates" ||
      getPathname() === "/clients" ||
      getPathname() === "/jobs",
  });

  useEffect(() => {
    if (
      getPathname() === "/candidates" ||
      getPathname() === "/clients" ||
      getPathname() === "/jobs"
    ) {
      setFilterCol(colData);
    }
  }, [colIsPending]);

  // console.log(filterCol);

  let columns: ColumnsType<DataType> = [];
  if (Array.isArray(rawColumns)) {
    columns = rawColumns
      .filter((column) => filterCol && filterCol.includes(column.key))
      .map((column, index) => ({
        ...column,
        dataIndex: column.key,
        ...getColumnSearchProps(column.key),
        render: column.render
          ? column.render
          : (data: any, { id }) => (
              <>
                {Array.isArray(data) ? (
                  data.map((item, index) => (
                    <p className="mb-1" key={index}>
                      {item}
                    </p>
                  ))
                ) : index === 0 || index === 1 ? (
                  <Button
                    type="link"
                    className="font-medium"
                    onClick={() => {
                      showDetail(id);
                    }}
                  >
                    {data}
                  </Button>
                ) : (
                  <>{data}</>
                )}
              </>
            ),
      }));

    columns.push({
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id: string) => (
        <button
          onClick={() => {
            showDetail(id);
          }}
        >
          <EyeOutlined />
        </button>
      ),
    });
  }

  const header = (
    <Flex justify="space-between">
      <span className="text-xl font-bold">
        {titleTable} ({paginationOption?.total || 0})
      </span>

      <Flex gap="middle">
        {createBtn && !noFilter && (
          <>
            <Button onClick={createBtn.handler} className="flex items-center">
              <PlusOutlined />
              {createBtn.title}
            </Button>
            <Dropdown
              menu={{
                items: [
                  ...items,
                  {
                    disabled: true,
                    key: "action",
                    label: "Action",
                  },
                ],
                selectable: true,
                multiple: true,
                defaultSelectedKeys: filterCol,
                onSelect: handleMenuSelect,
                onDeselect: handleMenuSelect,
              }}
            >
              <Button>
                <div className="flex items-center justify-center">
                  <span className="pr-1">Custom Column</span>
                  <CaretDownOutlined />
                </div>
              </Button>
            </Dropdown>
          </>
        )}
        {!noFilter && (
          <Button onClick={() => removeAllFilter()}>Clear All Filters</Button>
        )}{" "}
      </Flex>
    </Flex>
  );

  const footer = paginationOption && (
    <div className="flex justify-end">
      <Pagination
        current={getAllParams().page ? parseInt(getAllParams().page) : 1}
        onChange={paginationOption.handlePageChange}
        total={paginationOption.total}
        pageSize={paginationOption.pageSize}
        showSizeChanger={false}
      />
    </div>
  );

  const dataSource = data?.map((item, index) => ({ ...item, key: index }));

  return (
    <Card>
      <Space
        style={{
          marginBottom: 16,
        }}
      ></Space>

      <Table
        className="w-full"
        loading={(colIsLoading && getPathname() !== "/dashboard") || loading}
        title={() => header}
        footer={() => footer}
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </Card>
  );
};
export default DataTable;
