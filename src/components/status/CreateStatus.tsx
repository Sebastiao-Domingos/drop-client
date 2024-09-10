import { AlertFail, AlertLoading, AlertSuccess } from '@/components/Alert';
import LoadingStatus from '../../../@types/LoadingStatus';

interface StatusProps {
  textLoading: string;
  textError: string;
  textSuccess: string;
  status: LoadingStatus;
}

function CreateStatus({
  status,
  textError,
  textLoading,
  textSuccess,
}: StatusProps) {
  // console.log(status);

  switch (status) {
    case LoadingStatus.LOADING:
      return (
        <AlertLoading className="mt-0">
          <span>{textLoading}</span>
        </AlertLoading>
      );
    case LoadingStatus.ERROR:
      return (
        <AlertFail className="mt-0">
          <span>{textError}</span>
        </AlertFail>
      );
    case LoadingStatus.SUCCESS:
      return (
        <AlertSuccess className="mt-0">
          <span>{textSuccess}</span>
        </AlertSuccess>
      );
  }
}

export default CreateStatus;
