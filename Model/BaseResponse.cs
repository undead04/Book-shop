namespace BookShop.Model
{
    public class BaseResponse<T>
    {
        public int ErrorCode { get; set; }
        public T? Message { get; set; }
        public T? Data { get; set; }
        public static BaseResponse<T> WithData(T data)
        {
            return new BaseResponse<T>
            {
                
                Message = default,
                Data = data
            };
        }

        public static BaseResponse<T> Success(T message)
        {
            return new BaseResponse<T>
            {
               
                Message = message
            };
        }

        public static BaseResponse<T> Error(T message, int errorCode)
        {
            return new BaseResponse<T>
            {
                ErrorCode = errorCode,
                Message = message
            };
        }

    }
}
