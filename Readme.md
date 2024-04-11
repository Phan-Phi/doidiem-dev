# **The hill member intro web Backend**

## **Thông tin**

---

- Đây là project backend và cms của website The hill member intro web:

## **Mục đích của project**

---

- Cung cấp cho website the hill member intro một api backend và cms để sử dụng.

## **Lưu ý**

---

- Các dev cho project này nên cài pre-commit đề auto format file trước khi commit
  - Chạy lện này trong môi trường dev `pip install pre-commit`
  - Chạy lệnh này trong môi trường dev `pre-commit install` - extension sẽ được thêm vào .github ( mỗi lần commit sẽ tự format, nhớ git add lại nếu pre-commit báo fixing file nào đó )
    - Có thể tự chạy trước bằng lệnh `pre-commit run --all`
- Frontend sẽ lưu các ảnh liên quan đến bộ công thương, ảnh app store và google play dành cho tải app

## **Để chạy và phát triển dự án**

---

1. Cài đặt docker và docker-compose
2. Chạy lệnh `docker-compose -f docker-compose.yml up --build`

## **QR Code**

---

- **Các endpoint**:
  - `/qr/store/` Đây là link cho qr code của app quán
  - `/qr/customer/` Đây là link cho qr code của app khách

## **Domain**

---

- **Domain API**: `https://member-intro.t-solution.vn/`

## **API note**

---

- **Authorization API**<br />
  - `API method POST`: header của các endpoint method POST phải có field Authoriazation chứa API key.
  - `API key` : ubc9FYnH.brSNHwzFxNIZgehgQosDArgFe70dfigA
  - `Header` Authorization: Api-Key {API key}
- **Api sẽ paginate theo dạng limit và offset vd:**<br />
  `/api/v2/pages/?limit=10&offset=1` Mặc định data trong response của các endpoint của ( page,partner,tag ) đều được paginate dù có có limit hay offset nên response của endpoint cho ( page,partner,tag ) có thêm 2 field: - `next`: link hoặc null (link là một endpoint lấy data ở page sau, null khi không có data ở page sau) - `previous`: link hoặc null (link là một endpoint lấy data ở page trước, null khi không có data ở page trước)
- **Các endpoints**:
  - `/api/v2/` Đây là endpoint trả về settings chung cho frontend.
  - `/api/v2/tags/` Đây là endpoint trả về thẻ bài viết.
  - `/api/v2/store-categories/` Đây là endpoint trả về danh mục quán.
  - `/api/v2/banks/` Đây là endpoint trả về các ngân hàng.
  - `/api/v2/partners/` Đây là endpoint trả về các đối tác.
  - `/api/v2/subcribers/` Đây là endpoint để khách subcribe.
    - `method` : post
    - `payload` :
      - email ( string ) : email `(bắt buộc)`
    - `response`:
      - Success: status code 200, data trả về là các field trên
      - Fail: status code từ 400, không có data trả về
  - `/api/v2/submissions/` Đây là endpoint để quán đăng kí.
    - `method` : post
    - `payload` :
      - store_name ( string ) : tên quán `(bắt buộc)`
      - presentator ( string ): tên người đại diện `(bắt buộc)`
      - email ( string ): email `(bắt buộc)`
      - phone ( string ): số điện thoại `(bắt buộc)`
      - website ( string ): website `(không bắt buộc)`
      - address ( string ): địa chỉ `(bắt buộc)`
      - business_type ( string ): gồm các lựa chọn company, individual `(bắt buộc)`
    - `response`:
      - Success: status code 200, data trả về là các field trên
      - Fail: status code 400, không có data trả về
  - `/api/v2/pages/` Đây là endpoint trả về nội dung các của các trang cho frontend.
  - `/api/v2/pages/{id}/` Đây là endpoint trả về nội dung của một trang cho frontend.
- **Tham số thường sử dụng**:
  - `?type={str}` ( Cho page ) Nhận vào tên của loại trang muốn lấy - Sẽ trả về các trang có loại tương ứng, hiện tại đang có 11 loại trang:
    - `home.HomePage`
    - `contact.ContactPage`
    - `blog.BlogListingPage`
    - `blog.BlogCategoryPage`
    - `blog.BlogDetailPage`
    - `faq.FAQCategoryListingPage`
    - `faq.FAQCategoryPage`
    - `partner.PartnerListingPage`
    - `partner.PartnerCategoryPage`
    - `policy.PolicyPage`
    - `policy.ConditionPage`
    - `guide.GuideListingPage`
    - `guide.GuideDetailPage`
  - `?fields={str}` ( Cho page, setting ) Nhận vào tên các trường dữ liệu ngăn cách với nhau bằng dấu phẩy - Sẽ trả về những trường dữ liệu ứng với những trường đã khai báo vd: `?fields=title,banner`.
    - Để lấy hết thì sử dụng `?fields=*` ( lưu ý có thể sẽ không lấy hết được các trường dữ liệu mong muốn nếu không khai báo tham số type ở trên ).
  - `?child_of={int}` ( Cho page ) Nhận vào id của một trang - Sẽ trả về các trang con của trang tương ứng,
  - `?{field name}={any}` ( Cho page ) Nhận vào giá trị muốn filter - Sẽ trả về các trang có trường dữ liệu trùng với giá trị tương ứng.
  - `?order={str}` ( Cho page ) Nhận vào giá trị là tên trường dữ liệu muốn sắp xếp theo - Sẽ trả về các trang được sắp xếp theo trường dữ liệu tương ứng.
  - `?search={str}` (cho page) Nhận vào giá trị là các đoạn text để tìm kiếm các trang có chứa các đoạn text đó, các đoạn text được ngăn cách bởi dấu `+`, field `search_operator` đi chung với `search` để định nghĩa các đoạn text được xử lí, `search_operator` có 2 giá trị `and` và `or`
    - ví dụ search các page chứa đoạn text "lorem ipsum" là `?search=lorem%20ipsum`,
    - ví dụ search các page chứa cả 2 đoạn text độc lập nhau, ví dụ đoạn "lorem ipsum" và "abc xyz" là `?search=lorem%20ipsum+abc%20xyz`, khi không khai báo field `search_operator` câu query được hiểu ngầm là dùng operator `and`, nếu muốn kết quả là các page chứa 1 trong 2 đoạn text là `?search=lorem%20ipsum+abc%20xyz&search_operator=or`
    - ví dụ search các bài viết có chứa đoạn text "lorem ipsum" thì là `?type=blog.BlogDetailPage&search=lorem%20ipsum`

## **Cách tổ chức model**

- Các page là các model được xây dựng dựa trên mô hình cây
- Cụ thể:
  - HomePage là page gốc (node root). HomePage có các page con là ContactPage, BlogListingPage, FAQCategoryListingPage, PartnerListingPage, PolicyPage, ConditionPage ( các node con ).
  - BlogListingPage có page con là BlogCategoryPage. FAQCategoryListingPage có page con là FAQCategoryPage. PartnerListingPage có page con là PartnerCategoryPage
  - BlogCategoryPage có page con là BlogDetailPage

## **API ví dụ**

- Ví dụ 1:
  - Trang danh sách bài viết bao gồm các bài viết, danh mục bài viết, các tag, sẽ fetch như sau:
    - `/api/v2/pages/?fields=*&type=blog.BlogListingPage` - lấy trang danh sách bài viết với tất cả field
    - `/api/v2/pages/?type=blog.BlogCategoryPage` - lấy tất cả trang danh mục bài viết
    - `/api/v2/pages/?fields=content,first_published_at&type=blog.BlogDetailPage&limit=6` - lấy content,first_published_at của 6 bài viết đầu tiên
    - `/api/v2/tags/?limit=6` - lấy 6 tag bài viết
- Ví dụ 2:
  - Lấy các bài viết có chứa tag, sẽ fetch như sau:
    - `/api/v2/pages/?type=blog.BlogDetailPage&tags=a,b,c` với a,b,c là tag được ngăn cách bởi dấu ","
- Ví dụ 3:
  - Lấy các bài viết thuộc một category, sẽ fetch như sau:
    - `/api/v2/pages/?child_of=1` giả sử id của page category là 1, gọi với endpoint như vậy sẽ lấy tối đa 20 bài viết của category này, hoặc fetch như sau `/api/v2/pages/?child_of=1&type=blog.BlogDetailPage` đều như nhau vì loại của page con của page BlogCategory là blog.BlogDetailPage. Nếu fetch như sau `/api/v2/pages/?child_of=1&type=blog.BlogCategoryPage` không trả về kết quả nào vì không tồn tại những page thỏa `điều kiện` là `các page phải có loại là blog.BlogCategoryPage` và là `con của page có id bằng 1 trong khi page có id = 1 cũng thuộc loại blog.BlogCategoryPage`.
- Ví dụ 4:
  - Lấy 9 đối tác, sẽ fetch như sau:
    - `/api/v2/partners/?limit=9`
- Ví dụ 5:
  - Trang đối tác bao gồm danh mục đối tác, các đối tác của từng danh mục, sẽ fetch như sau:
    - `/api/v2/pages/?type=partner.PartnerListingPage` : lấy thông tin của trang partner như là banner, subtitle, title,...
    - `/api/v2/pages/?type=partner.PartnerCategoryPage`: lấy thông tin các danh mục và các đối tác được inline trong từng danh mục
- Ví dụ 6:
  - Trang câu hỏi bao gồm các danh mục câu hỏi, sẽ fetch như sau:
    - `/api/v2/pages/?type=faq.FAQCategoryListingPage` : lấy thông tin của trang faq như là banner, subtitle, title, ...
    - `/api/v2/pages/?type=faq.FAQCategoryPage` : lấy tất cả danh mục câu hỏi, các câu hỏi và câu trả lời được inline trong từng danh mục
- Ví dụ 7:
  - Lấy 3 bài viết để hiển thị ở trang chủ, sẽ fetch như sau:
    - `/api/v2/pages/?type=blog.BlogDetailPage&is_on_homepage=true&limit=3`: lấy 3 trang loại BlogDetailPage và có thuộc tính `is_on_homepage=true` ( thuộc tính bằng `true` thì page đó được hiển thị ở trang chủ ) và lấy 3 bài
- Ví dụ 8:
  - Lấy 9 đối tác để hiển thị ở trang chủ, sẽ fetch như sau:
    - `/api/v2/partners/?is_on_homepage=true&limit=9`: lấy 9 đối tác và có thuộc tính `is_on_homepage=true`
