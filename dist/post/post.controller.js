"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const persian_tools_1 = require("@persian-tools/persian-tools");
const got_1 = require("got");
const app_key_guard_1 = require("../common/guards/app-key.guard");
const is_public_decorator_1 = require("../common/guards/is-public.decorator");
const event_entity_1 = require("../event/entities/event.entity");
const pagination_dto_1 = require("./dto/pagination.dto");
const create_post_dto_1 = require("./dtos/create-post.dto");
const update_post_dto_1 = require("./dtos/update-post.dto");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async car() {
        var categorylist = ['انتخاب دسته بندی', "buy-old-house", "buy-villa", "buy-apartment", "buy-residential", "auto", "classic-car", "rental-car", "heavy-car", "electronic-devices", "home-kitchen", "services", "personal-goods", "entertainment", "social-services", "tools-materials-equipment", "jobs"];
        var response2 = await (0, got_1.default)(`https://api.divar.ir/v8/web-search/mashhad/${categorylist[1]}`);
        var json = JSON.parse(response2.body);
        var carlist = [];
        json.widget_list.forEach((item) => {
            var descript = item.data.description;
            var splitpriceANDkilometer = descript.split(`\n`);
            var kilometer = splitpriceANDkilometer[1];
            if (categorylist[1] == 'auto') {
                var price = splitpriceANDkilometer[1];
            }
            else {
                var price = splitpriceANDkilometer[0];
            }
            var carobject = {
                title: item.data.title,
                price: (price == undefined) ? "" : price,
                kilometer: (kilometer == undefined) ? "" : kilometer,
                image: item.data.image
            };
            carlist.push(carobject);
        });
        let main3 = `
    <div3><label for="Category">Please Choose Your Category and enter in the url:</label>
    <select name="Category" id="Category" onchange="document.location.href = '/post/' + this.value">`;
        for (let i = 0; i < categorylist.length; i++) {
            main3 = main3 + `<option value="${categorylist[i]}">${categorylist[i]}</option>`;
        }
        main3 = main3 + `</select><br><br>`;
        var sum = 0;
        var count = 0;
        var priclist = [];
        var advertic = ``;
        carlist.forEach(item => {
            advertic += `<div7 style="border: 1px solid #FB4805;background-color: #FF5733; margin: 6px;border-width:3px ;border-radius: 20px;color:white;width:25%;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
                    <div8 style="display: flex;flex-wrap: wrap;flex-direction: column;">
                     <div9>${item.title}</div9>
                     <div10>${item.price}</div10>
                     <div11>${item.kilometer}</div11>
                    </div8>
                    <img style="border-radius: 15px;" src= ${item.image}>
                </div7>`;
            if (item.price != "") {
                var splitpriceANDtoman = item.price.replace('تومان', '');
                var splitpriceANDtoman2 = splitpriceANDtoman.replace(',', '');
                var splitpriceANDtoman3 = splitpriceANDtoman2.replace(',', '');
                if (Number.isInteger(parseInt((0, persian_tools_1.digitsFaToEn)(splitpriceANDtoman3)))) {
                    sum = sum + parseInt((0, persian_tools_1.digitsFaToEn)(splitpriceANDtoman3));
                    priclist.push(parseInt((0, persian_tools_1.digitsFaToEn)(splitpriceANDtoman3)));
                    count++;
                }
            }
        });
        var average = Math.floor(sum / count);
        let domain = Math.max(...priclist) - Math.min(...priclist);
        let charak1 = Math.min(...priclist) + Math.floor(domain / 4);
        let charak2 = Math.min(...priclist) + Math.floor(domain / 2);
        let charak3 = Math.min(...priclist) + Math.floor((domain / 4) * 3);
        let countFistScope = 0;
        let countSecondeScope = 0;
        let countThiredeScope = 0;
        let countFourthScope = 0;
        priclist.forEach(item => {
            if (item >= Math.min(...priclist) && item < charak1) {
                countFistScope++;
            }
            else if (item >= charak1 && item < charak2) {
                countSecondeScope++;
            }
            else if (item >= charak2 && item < charak3) {
                countThiredeScope++;
            }
            else if (item >= charak3 && Math.max(...priclist) >= item) {
                countFourthScope++;
            }
        });
        let percentFistScope = ((countFistScope / count) * 100).toFixed(2);
        let percentSecondeScope = ((countSecondeScope / count) * 100).toFixed(2);
        let percentThiredScope = ((countThiredeScope / count) * 100).toFixed(2);
        let percentFourthScope = ((countFourthScope / count) * 100).toFixed(2);
        var chart = `<div30 style="
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;"><div130 style="
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: right;">
        <div30111 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${Math.min(...priclist)}-${charak1}</label>
        <div3011 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div301 style="border: 1px solid #FB4805;background-color: #E56997;margin:5px;border-radius: 2px;color:white;width:${percentFistScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div301><label><h3>${percentFistScope}%</h3></label>
        </div3011>
        </div30111>
        <div30222 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak1}-${charak2}</label>
        <div3022 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div302 style="border: 1px solid #FB4805;background-color: #BD97CB;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentSecondeScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div302><label><h3>${percentSecondeScope}%</h3></label>
        </div3022>
        </div30222>
        <div30333 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak2}-${charak3}</label>
        <div3033 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div303 style="border: 1px solid #FB4805;background-color: #FFD700;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentThiredScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div303><label><h3>${percentThiredScope}%</h3></label>
        </div3033>
        </div30333>
        <div30444 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak3}-${Math.max(...priclist)}</label>
        <div3044 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div304 style="border: 1px solid #FB4805;background-color: #66D2D6;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentFourthScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div304><label><h3>${percentFourthScope}%</h3></label>
        </div3044>
        </div30444>
        </div130>
        <div140>
           <div20 style="text-align:center;margin-bottom: 30px;border: 1px solid #fff;background:rgb(235, 197, 100)"><h2>تحلیل بازار</h2></div20>
           <div21 style="text-align:center;"><h3>میانگین قیمت:${(0, persian_tools_1.digitsEnToFa)(average)} تومان</h3></div21>
           <div25 style="text-align:center;"><h3>بالا ترین قیمت:${(0, persian_tools_1.digitsEnToFa)(Math.max(...priclist))} تومان</h3></div25>
           <div26 style="text-align:center;"><h3>پایین ترین قیمت:${(0, persian_tools_1.digitsEnToFa)(Math.min(...priclist))} تومان</h3></div26>
        </div140>
    </div30>`;
        var car = `<h1> ${categorylist[1]} Shop</h1>`;
        car += "<h2>you can campare and then choose the best</h2>";
        car += main3 + `</div3><div6 style="
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;">${chart}<div120 style="
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;"><div4 style="
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;">` + advertic;
        car += `</div4><div5><form action="#" class="form" style="flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width:250px">
    <div  class="lable" style="text-align: right;margin-bottom: 30px"> 
        <label>نام کاربری</label><br>
        <input type="text"  class="form_control" required style="width: 200px;
        border: 1px solid #fff;
        background-color: rgb(240, 240, 240);
        border-color:rgb(207, 207, 207) ;
        height: 55px;">
    </div>
    <div class="lable" style="text-align: right;margin-bottom: 30px"> 
        <label>پسورد</label><br>
        <input type="text"  class="form_control" required style="width:200px;
        border: 1px solid #fff;
        background-color: rgb(240, 240, 240);
        border-color:rgb(207, 207, 207) ;
        height: 55px;">
    </div>
   
   
    <div class="lable" style="text-align: right;margin-bottom: 30px;"> 
        <input type="submit" class="button_controll" style="border: 1px solid #fff;background:rgb(235, 197, 100) ;color: rgb(255, 255, 255) ;border-color: rgb(235, 197, 100);padding: 1px;height: 60px;font-size: 21px;line-height: 60px;width: 120px;" value="ارسال">
    </div>
</form></div5></div120></div6>`;
        return car;
    }
    findAll() {
        return this.postService.findAll();
    }
    async car2(category) {
        var categorylist = ['انتخاب دسته بندی', "buy-old-house", "buy-villa", "buy-apartment", "buy-residential", "auto", "classic-car", "rental-car", "heavy-car", "electronic-devices", "home-kitchen", "services", "personal-goods", "entertainment", "social-services", "tools-materials-equipment", "jobs"];
        var response2 = await (0, got_1.default)(`https://api.divar.ir/v8/web-search/mashhad/${category}`);
        var json = JSON.parse(response2.body);
        var carlist = [];
        json.widget_list.forEach((item) => {
            var descript = item.data.description;
            var splitpriceANDkilometer = descript.split(`\n`);
            var kilometer = splitpriceANDkilometer[1];
            if (category == 'auto') {
                var price = splitpriceANDkilometer[1];
            }
            else {
                var price = splitpriceANDkilometer[0];
            }
            var carobject = {
                title: item.data.title,
                price: (price == undefined) ? "" : price,
                kilometer: (kilometer == undefined) ? "" : kilometer,
                image: item.data.image
            };
            carlist.push(carobject);
        });
        let main3 = `
    <div3><label for="Category">Please Choose Your Category and enter in the url:</label>
    <select name="Category" id="Category" onchange="document.location.href = '/post/' + this.value">`;
        for (let i = 0; i < categorylist.length; i++) {
            main3 = main3 + `<option value="${categorylist[i]}">${categorylist[i]}</option>`;
        }
        main3 = main3 + `</select><br><br>`;
        var sum = 0;
        var count = 0;
        var priclist = [];
        var advertic = ``;
        carlist.forEach(item => {
            advertic += `<div7 style="border: 1px solid #FB4805;background-color: #FF5733; margin: 6px;border-width:3px ;border-radius: 20px;color:white;width:25%;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
                    <div8 style="display: flex;flex-wrap: wrap;flex-direction: column;">
                     <div9>${item.title}</div9>
                     <div10>${item.price}</div10>
                     <div11>${item.kilometer}</div11>
                    </div8>
                    <img style="border-radius: 15px;" src= ${item.image}>
                </div7>`;
            if (item.price != "") {
                var splitpriceANDtoman = item.price.replace('تومان', '');
                var splitpriceANDtoman2 = splitpriceANDtoman.replace(',', '');
                var splitpriceANDtoman3 = splitpriceANDtoman2.replace(',', '');
                if (Number.isInteger(parseInt((0, persian_tools_1.digitsFaToEn)(splitpriceANDtoman3)))) {
                    sum = sum + parseInt((0, persian_tools_1.digitsFaToEn)(splitpriceANDtoman3));
                    priclist.push(parseInt((0, persian_tools_1.digitsFaToEn)(splitpriceANDtoman3)));
                }
            }
            count++;
        });
        var average = Math.floor(sum / count);
        let domain = Math.max(...priclist) - Math.min(...priclist);
        let charak1 = Math.min(...priclist) + Math.floor(domain / 4);
        let charak2 = Math.min(...priclist) + Math.floor(domain / 2);
        let charak3 = Math.min(...priclist) + Math.floor((domain / 4) * 3);
        let countFistScope = 0;
        let countSecondeScope = 0;
        let countThiredeScope = 0;
        let countFourthScope = 0;
        priclist.forEach(item => {
            if (item >= Math.min(...priclist) && item < charak1) {
                countFistScope++;
            }
            else if (item >= charak1 && item < charak2) {
                countSecondeScope++;
            }
            else if (item >= charak2 && item < charak3) {
                countThiredeScope++;
            }
            else if (item >= charak3 && Math.max(...priclist) >= item) {
                countFourthScope++;
            }
        });
        let percentFistScope = ((countFistScope / count) * 100).toFixed(2);
        let percentSecondeScope = ((countSecondeScope / count) * 100).toFixed(2);
        let percentThiredScope = ((countThiredeScope / count) * 100).toFixed(2);
        let percentFourthScope = ((countFourthScope / count) * 100).toFixed(2);
        var chart = `<div30 style="
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;"><div130 style="
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: right;">
        <div30111 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${Math.min(...priclist)}-${charak1}</label>
        <div3011 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div301 style="border: 1px solid #FB4805;background-color: #E56997;margin:5px;border-radius: 2px;color:white;width:${percentFistScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div301><label><h3>${percentFistScope}%</h3></label>
        </div3011>
        </div30111>
        <div30222 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak1}-${charak2}</label>
        <div3022 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div302 style="border: 1px solid #FB4805;background-color: #BD97CB;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentSecondeScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div302><label><h3>${percentSecondeScope}%</h3></label>
        </div3022>
        </div30222>
        <div30333 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak2}-${charak3}</label>
        <div3033 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div303 style="border: 1px solid #FB4805;background-color: #FFD700;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentThiredScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div303><label><h3>${percentThiredScope}%</h3></label>
        </div3033>
        </div30333>
        <div30444 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;"><label> price between ${charak3}-${Math.max(...priclist)}</label>
        <div3044 style="
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: left;">
        <div304 style="border: 1px solid #FB4805;background-color: #66D2D6;margin:5px;border-width:1px ;border-radius: 2px;color:white;width:${percentFourthScope};height: 30px;font-size:20px;direction: rtl;display: flex;flex-wrap: wrap;flex-direction: row;justify-content:center;">
        </div304><label><h3>${percentFourthScope}%</h3></label>
        </div3044>
        </div30444>
        </div130>
        <div140>
           <div20 style="text-align:center;margin-bottom: 30px;border: 1px solid #fff;background:rgb(235, 197, 100)"><h2>تحلیل بازار</h2></div20>
           <div21 style="text-align:center;"><h3>میانگین قیمت:${(0, persian_tools_1.digitsEnToFa)(average)} تومان</h3></div21>
           <div25 style="text-align:center;"><h3>بالا ترین قیمت:${(0, persian_tools_1.digitsEnToFa)(Math.max(...priclist))} تومان</h3></div25>
           <div26 style="text-align:center;"><h3>پایین ترین قیمت:${(0, persian_tools_1.digitsEnToFa)(Math.min(...priclist))} تومان</h3></div26>
        </div140>
    </div30>`;
        var car = `<h1> ${category} Shop</h1>`;
        car += "<h2>you can campare and then choose the best</h2>";
        car += main3 + `</div3><div6 style="
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;">${chart}<div120 style="
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;"><div4 style="
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;">` + advertic;
        car += `</div4><div5><form action="#" class="form" style="flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width:250px">
    <div  class="lable" style="text-align: right;margin-bottom: 30px"> 
        <label>نام کاربری</label><br>
        <input type="text"  class="form_control" required style="width: 200px;
        border: 1px solid #fff;
        background-color: rgb(240, 240, 240);
        border-color:rgb(207, 207, 207) ;
        height: 55px;">
    </div>
    <div class="lable" style="text-align: right;margin-bottom: 30px"> 
        <label>پسورد</label><br>
        <input type="text"  class="form_control" required style="width:200px;
        border: 1px solid #fff;
        background-color: rgb(240, 240, 240);
        border-color:rgb(207, 207, 207) ;
        height: 55px;">
    </div>
    
   
    <div class="lable" style="text-align: right;margin-bottom: 30px;"> 
        <input type="submit" class="button_controll" style="border: 1px solid #fff;background:rgb(235, 197, 100) ;color: rgb(255, 255, 255) ;border-color: rgb(235, 197, 100);padding: 1px;height: 60px;font-size: 21px;line-height: 60px;width: 120px;" value="ارسال">
    </div>
</form></div5></div120></div6>`;
        return car;
    }
    findAllPaginated(query) {
        return this.postService.findAll(query);
    }
    findOne(id) {
        return this.postService.findOne(parseInt(id));
    }
    insert(body) {
        return this.postService.create(body);
    }
    update(id, body) {
        return this.postService.update(id, body);
    }
    patch(id, body) {
        console.log(body instanceof update_post_dto_1.UpdatePostDto);
        return this.postService.update(+id, body);
    }
    delete(id) {
        return this.postService.delete(+id);
    }
    like(id, userId, type) {
        console.log('event');
        console.log(id);
        return this.postService.event(+id, type, userId);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, is_public_decorator_1.isPublic)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "car", null);
__decorate([
    (0, common_1.Get)('/:category'),
    (0, is_public_decorator_1.isPublic)(),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "car2", null);
__decorate([
    (0, common_1.Get)('/paginate'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAllPaginated", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, is_public_decorator_1.isPublic)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "insert", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id/event/:type/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "like", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map